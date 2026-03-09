'use strict';

import jwt from 'jsonwebtoken';
import { cloudinary } from './file-uploader.js';
import Client from '../src/client/client.model.js';

const DEFAULT_AVATAR_URL = process.env.DEFAULT_AVATAR_URL
    || 'https://res.cloudinary.com/djuxr89ny/image/upload/HaircutFiveFriends/images/default-avatar_ewzxwx.png';

const cleanUploadedFile = async (req) => {
    if (req.file && req.file.filename) {
        try {
            await cloudinary.uploader.destroy(req.file.filename);
        } catch (err) {
            console.error('Error limpiando imagen tras validación de JWT:', err);
        }
    }
};

export const validateJWT = (req, res, next) => {
    try {
        let token =
            req.header('x-token') ||
            req.header('authorization') ||
            req.query.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No hay token en la petición',
            });
        }

        token = token.replace(/^Bearer\s+/i, '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        });

        req.auth = {
            ...decoded,
            userId: decoded.sub,
        };
        req.userId = decoded.sub;
        req.userRole = decoded.role;

        next();
    } catch (error) {
        let message = 'Token inválido';
        if (error.name === 'TokenExpiredError') message = 'Token expirado';

        return res.status(401).json({ success: false, message, error: error.message });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.userRole || !allowedRoles.includes(req.userRole)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para esta acción',
            });
        }
        next();
    };
};

export const attachClientFromToken = async (req, res, next) => {
    try {
        if (!req.userId) return next();
        req.clientFromToken = await Client.findOne({ userId: req.userId });
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const requireClientFromToken = (req, res, next) => {
    if (!req.clientFromToken) {
        return res.status(404).json({
            success: false,
            message: 'Cliente no encontrado para el usuario autenticado',
        });
    }
    next();
};

export const ensureClientMatchesToken = async (req, res, next) => {
    try {
        const { email: tokenEmail, password: tokenPassword, profilePicture: tokenProfile } = req.auth || {};

        const bodyEmail = req.body?.email;
        const bodyPassword = req.body?.password;
        const bodyProfile = req.file?.path || req.body?.profilePicture;

        if (!bodyEmail || !bodyPassword) {
            await cleanUploadedFile(req);
            return res.status(400).json({
                success: false,
                message: 'El correo y la contraseña son obligatorios en el cuerpo de la petición',
            });
        }

        if (tokenEmail && bodyEmail !== tokenEmail) {
            await cleanUploadedFile(req);
            return res.status(401).json({
                success: false,
                message: 'El correo del token no coincide con el enviado en la petición',
            });
        }

        if (tokenPassword && bodyPassword !== tokenPassword) {
            await cleanUploadedFile(req);
            return res.status(401).json({
                success: false,
                message: 'La contraseña del token no coincide con la enviada en la petición',
            });
        }

        const tokenHasCustomProfile = tokenProfile && tokenProfile !== DEFAULT_AVATAR_URL;
        if (tokenHasCustomProfile) {
            if (!bodyProfile || bodyProfile !== tokenProfile) {
                await cleanUploadedFile(req);
                return res.status(401).json({
                    success: false,
                    message: 'La imagen de perfil del token no coincide con la enviada en la petición',
                });
            }
        }

        next();
    } catch (error) {
        await cleanUploadedFile(req);
        return res.status(500).json({ success: false, message: error.message });
    }
};
