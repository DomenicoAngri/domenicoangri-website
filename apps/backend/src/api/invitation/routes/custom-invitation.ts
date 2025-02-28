"use strict";

/**
 * Custom routes for invitations
 */

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/invitations/verify/:code",
            handler: "custom-invitation.verifyCode",
            config: {
                auth: false, // Accessible without authentication
                middlewares: [], // Optional custom middlewares
            },
        },
        {
            method: "PUT",
            path: "/invitations/attendance/:code",
            handler: "custom-invitation.updateAttendance",
            config: {
                auth: false, // Accessible without authentication
                middlewares: [], // Optional custom middlewares
            },
        },
    ],
};
