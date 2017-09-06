"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SchemaProperty {
    constructor(params) {
        this.required = false;
        this.enum = [];
        this.oneOf = [];
        this.name = "";
        this.type = "string";
        this.format = "";
        this.minLength = null;
        this.maxLength = null;
        this.setValues(params);
    }
    setValues(params) {
        if (typeof params !== "undefined") {
            if (typeof params.name === "string" && params.name !== "") {
                this.setName(params.name);
            }
            if (typeof params.format === "string" && params.format !== "") {
                this.setFormat(params.format);
            }
            if (typeof params.minLength === "number" && params.minLength >= 0) {
                this.setMinLength(params.minLength);
            }
            if (typeof params.maxLength === "number" && params.maxLength > 0) {
                this.setMaxLength(params.maxLength);
            }
            if (typeof params.type === "string" && params.type !== "") {
                this.setType(params.type);
            }
            if (typeof params.required === "boolean") {
                this.setRequired(params.required);
            }
            if (typeof params.anyOf === "object" && params.anyOf instanceof Array) {
                this.setType("anyOf");
                this.setAnyOf(params.anyOf);
            }
            if (typeof params.$ref === "string" && params.$ref !== "") {
                this.setType("$ref");
                this.setRef(params.$ref);
            }
            if (typeof params.items === "object" && Object.keys(params.items).length > 0) {
                this.setType("array");
                this.setItems(new SchemaProperty(params.items));
            }
        }
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setType(type, enumValues) {
        this.type = type;
        if (type === "enum" && typeof enumValues !== "undefined") {
            this.enum = enumValues;
        }
    }
    getType() {
        return this.type;
    }
    setRequired(required) {
        this.required = required;
    }
    isRequired() {
        return this.required;
    }
    setFormat(format) {
        this.format = format;
    }
    getFormat() {
        return this.format;
    }
    setMinLength(length) {
        this.minLength = length;
    }
    getMinLength() {
        return this.minLength;
    }
    setMaxLength(length) {
        this.maxLength = length;
    }
    getMaxLength() {
        return this.maxLength;
    }
    getEnum() {
        return this.enum;
    }
    setAnyOf(schemas) {
        this.anyOf = schemas;
    }
    getAnyOf() {
        return this.anyOf;
    }
    getRef() {
        return this.ref;
    }
    setRef(ref) {
        this.ref = ref;
    }
    setItems(items) {
        this.items = items;
    }
    getItems() {
        return this.items;
    }
}
exports.SchemaProperty = SchemaProperty;
