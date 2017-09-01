import 'jest';
import { Schema, SchemaProperty, SchemaGenerator } from './../../src/include';
var Ajv = require('ajv');


describe("Schema Generator", () => {

    let s = new Schema();
    let compiledSchema;

    it("should generate user schema", () => {        
        s.setId("user.json");
        s.setDescription("Twitter User description");
        s.addProperty({ "name" : "id", "type" : "number", required: true });
        s.addProperty({ "name" : "id_str", "type" : "string", required: true });
        s.addProperty({ "name" : "name", "type" : "string", required: true });
        s.addProperty({ "name" : "screen_name", "type" : "string", required: true });
    });
    
    it("should generate schema", () => {
        
    })
});