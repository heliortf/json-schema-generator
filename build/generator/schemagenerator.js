"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SchemaGenerator {
    buildRequiredProperties(schema) {
        if (schema.getProperties().length > 0) {
            const requiredProperties = schema.getProperties().filter((p) => {
                return p.isRequired();
            });
            return requiredProperties.map((p) => {
                return p.getName();
            });
        }
        return [];
    }
    buildProperty(p) {
        const property = {
            type: p.getType(),
        };
        switch (p.getType()) {
            case "object":
                break;
            case "string":
                if (p.getFormat() !== "") {
                    property.format = p.getFormat();
                }
                if (p.getMinLength() !== null) {
                    property.minLength = p.getMinLength();
                }
                if (p.getMaxLength() !== null) {
                    property.maxLength = p.getMaxLength();
                }
                break;
            case "enum":
                if (p.getEnum().length > 0) {
                    property.enum = p.getEnum();
                }
                break;
            case "anyOf":
                delete property.type;
                property.anyOf = this.buildSchemas(p.getAnyOf());
                break;
            case "$ref":
                delete property.type;
                property.$ref = "#/definitions/" + p.getRef();
                break;
            case "array":
                property.items = this.buildProperty(p.getItems());
                break;
        }
        return property;
    }
    buildProperties(schema) {
        const self = this;
        const properties = {};
        schema.getProperties().forEach((p) => {
            properties[p.getName()] = self.buildProperty(p);
        });
        return properties;
    }
    buildSchemas(schemas) {
        const self = this;
        const builtSchemas = schemas.map((schema) => {
            return self.build(schema);
        });
        return builtSchemas;
    }
    buildDefinitions(schema) {
        const self = this;
        const definitions = {};
        schema.getDefinitions().forEach((def) => {
            const schemaDefinition = self.build(def, true);
            delete schemaDefinition.id;
            delete schemaDefinition.type;
            definitions[def.getId()] = schemaDefinition;
        });
        return definitions;
    }
    build(schema, isSubSchema) {
        const obj = {
            type: schema.getType(),
        };
        if (!(typeof isSubSchema === "boolean" && isSubSchema === true)) {
            obj.$schema = "http://json-schema.org/draft-06/schema#";
        }
        if (schema.getId() !== "") {
            obj.id = schema.getId();
        }
        if (schema.getDescription() !== "") {
            obj.description = schema.getDescription();
        }
        if (schema.getProperties().length > 0) {
            obj.required = this.buildRequiredProperties(schema);
            obj.properties = this.buildProperties(schema);
        }
        if (schema.getDefinitions().length > 0) {
            obj.definitions = this.buildDefinitions(schema);
        }
        return obj;
    }
}
exports.SchemaGenerator = SchemaGenerator;
