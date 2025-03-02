"use strict";

/**
 * Custom routes for invitations.
 */

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/gender-reveal/invitations/verifyInviteCode/:code",
            handler: "custom-invitation.verifyInviteCode",
            config: {
                auth: false,
                middlewares: [],
            },
        },
        {
            method: "PUT",
            path: "/gender-reveal/invitations/updateAttendance/:code",
            handler: "custom-invitation.updateAttendance",
            config: {
                auth: false,
                middlewares: [],
            },
        },
    ],
};
