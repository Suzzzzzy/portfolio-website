import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: false,
            default: "설명이 아직 없습니다. 추가해 주세요.",
        },

        when_date: {
            type: String,
            required: false,
            default: "0000.00.00"
        },


    },
    {
        timestamps: true,
    }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };