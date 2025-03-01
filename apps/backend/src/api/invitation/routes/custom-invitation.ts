"use strict";

/**
 * Custom routes for invitations
 */

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/invitations/verifyInviteCode/:code",
            handler: "custom-invitation.verifyInviteCode",
            config: {
                auth: false, // Accessible without authentication
                middlewares: [], // Optional custom middlewares
            },
        },
        {
            method: "PUT",
            path: "/invitations/updateAttendance/:code",
            handler: "custom-invitation.updateAttendance",
            config: {
                auth: false, // Accessible without authentication
                middlewares: [], // Optional custom middlewares
            },
        },
    ],
};
