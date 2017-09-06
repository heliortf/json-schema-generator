"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class Schema {
    constructor(params) {
        this.description = "";
        this.type = "object";
        this.id = "";
        this.properties = [];
        this.definitions = [];
        this.setValues(params);
    }
    setValues(params) {
        const self = this;
        if (typeof params === "object") {
            if (typeof params.type === "string" && params.type !== "") {
                this.setType(params.type);
            }
            if (typeof params.id === "string" && params.id !== "") {
                this.setId(params.id);
            }
            if (typeof params.properties === "object" && Object.keys(params.properties).length > 0) {
                const keys = Object.keys(params.properties);
                const properties = keys.forEach((key) => {
                    self.addProperty(params.properties[key]);
                });
            }
        }
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
    setDescription(description) {
        this.description = description;
    }
    getDescription() {
        return this.description;
    }
    addProperty(p) {
        if (!(p instanceof index_1.SchemaProperty)) {
            p = new index_1.SchemaProperty(p);
        }
        this.properties.push(p);
    }
    getProperties() {
        return this.properties;
    }
    getProperty(name) {
        const list = this.properties.filter((p) => {
            if (p.getName() === name) {
                return true;
            }
            return false;
        });
        if (list.length > 0) {
            return list[0];
        }
        return false;
    }
    addDefinition(definition) {
        this.definitions.push(definition);
    }
    getDefinitions() {
        return this.definitions;
    }
}
exports.Schema = Schema;
