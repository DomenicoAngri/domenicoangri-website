"use strict";

/**
 * Custom controller for invitation management
 */

import {
    INVITE_CODE_NOT_FOUND,
    VERIFY_INVITE_CODE_SERVER_ERROR,
    UPDATE_ATTENDANCE_BAD_REQUEST,
    UPDATE_ATTENDANCE_CODE_SERVER_ERROR,
} from "./custom-invitation.consts";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::invitation.invitation", ({ strapi }) => ({
    // Method to verify an invitation code.
    async verifyInviteCode(ctx) {
        const { code } = ctx.params;

        try {
            // Find the invitation with the specified code.
            const invitation = await strapi.db.query("api::invitation.invitation").findOne({
                where: { inviteCode: code },
            });

            // If it doesn't exist, return a 404 error.
            if (!invitation) {
                return ctx.notFound(INVITE_CODE_NOT_FOUND);
            }

            // Return only necessary data (no sensitive data).
            return {
                success: true,
                invitation: {
                    id: invitation.inviteCode,
                    name: invitation.invitationName,
                    attendance: invitation.attendance,
                    numberOfPeople: invitation.numberOfPeople,
                },
            };
        } catch (error) {
            // In case of error, return a 500 error.
            console.error("ERROR --> ", error);
            ctx.internalServerError(VERIFY_INVITE_CODE_SERVER_ERROR);
        }
    },

    // Method to update an invitee's attendance.
    async updateAttendance(ctx) {
        const { code } = ctx.params;
        const { attendance, numberOfPeople } = ctx.request.body;

        try {
            // Verify that attendance is a boolean.
            if (typeof attendance !== "boolean") {
                return ctx.badRequest(UPDATE_ATTENDANCE_BAD_REQUEST);
            }

            // Find the invitation with the specified code.
            const invitation = await strapi.db.query("api::invitation.invitation").findOne({
                where: { inviteCode: code },
            });

            // If it doesn't exist, return a 404 error.
            if (!invitation) {
                return ctx.notFound(INVITE_CODE_NOT_FOUND);
            }

            // Update the attendance status.
            const updatedInvitation = await strapi.db.query("api::invitation.invitation").update({
                where: { id: invitation.inviteCode },
                data: { attendance, numberOfPeople },
            });

            // Return updated data (no sensitive data).
            return {
                success: true,
                invitation: {
                    id: updatedInvitation.inviteCode,
                    name: updatedInvitation.invitationName,
                    attendance: updatedInvitation.attendance,
                    numberOfPeople: updatedInvitation.numberOfPeople,
                },
            };
        } catch (error) {
            // In case of error, return a 500 error.
            ctx.internalServerError(UPDATE_ATTENDANCE_CODE_SERVER_ERROR);
        }
    },
}));
