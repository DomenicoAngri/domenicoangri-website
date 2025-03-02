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
        const lowerCaseCode = ctx.params.code.toLowerCase();

        try {
            // Find the invitation with the specified code.
            const invitation = await strapi.db.query("api::invitation.invitation").findOne({
                where: { inviteCode: lowerCaseCode },
            });

            // If it doesn't exist, return a 404 error.
            if (!invitation) {
                return ctx.notFound(INVITE_CODE_NOT_FOUND);
            }

            // Return only necessary data (no sensitive data).
            return {
                success: true,
                invitation: {
                    inviteCode: invitation.inviteCode,
                    invitationName: invitation.invitationName,
                    attendance: invitation.attendance,
                    numberOfPeople: invitation.numberOfPeople,
                    gender: invitation.gender,
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
        const lowerCaseCode = ctx.params.code.toLowerCase();
        const { gender, attendance, numberOfPeople } = ctx.request.body;

        try {
            // Verify that attendance is a boolean.
            if (typeof attendance !== "boolean" || typeof gender !== "string" || typeof numberOfPeople !== "number") {
                return ctx.badRequest(UPDATE_ATTENDANCE_BAD_REQUEST);
            }

            // Find the invitation with the specified code.
            const invitation = await strapi.db.query("api::invitation.invitation").findOne({
                where: { inviteCode: lowerCaseCode },
            });

            // If it doesn't exist, return a 404 error.
            if (!invitation) {
                return ctx.notFound(INVITE_CODE_NOT_FOUND);
            }

            // Update the attendance status.
            const updatedInvitation = await strapi.db.query("api::invitation.invitation").update({
                where: { inviteCode: invitation.inviteCode },
                data: { gender, attendance, numberOfPeople },
            });

            // Return updated data (no sensitive data).
            return {
                success: true,
                invitation: {
                    inviteCode: updatedInvitation.inviteCode,
                    invitationName: updatedInvitation.invitationName,
                    attendance: updatedInvitation.attendance,
                    numberOfPeople: updatedInvitation.numberOfPeople,
                    gender: updatedInvitation.gender,
                },
            };
        } catch (error) {
            console.log(error);
            // In case of error, return a 500 error.
            ctx.internalServerError(UPDATE_ATTENDANCE_CODE_SERVER_ERROR);
        }
    },
}));
