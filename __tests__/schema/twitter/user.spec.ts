

import 'jest';
import { Schema, SchemaProperty, SchemaGenerator } from './../../../src/include';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors : true }); // options can be passed, e.g. {allErrors: true}


describe("Twitter User Schema", () => {

    let s = new Schema();
    let generator   = new SchemaGenerator();
    let objSchema = null;
    let compiledSchema = null;

    

    it("should define", () => {
        s.setId("user");
        s.setType("object");

        expect(s.getId()).toBe("user");
        expect(s.getType()).toBe("object");
        expect(s.getProperties()).toHaveLength(0);
    })

    it("should define other properties", () => {
        s.addProperty({ "name" : "id", "type" : "number", required: true });
        s.addProperty({ "name" : "id_str", "type" : "string", required: true });
        s.addProperty({ "name" : "name", "type" : "string", required: true });
        s.addProperty({ "name" : "screen_name", "type" : "string", required: true });
        s.addProperty({ "name" : "location", "type" : "string", required: true });
        s.addProperty({ "name" : "description", "type" : "string", required: false });
        s.addProperty({ "name" : "url", "type" : "string", required: false });
        s.addProperty({ "name" : "protected", "type" : "boolean", required: true });
        s.addProperty({ "name" : "followers_count", "type" : "number", required: true });
        s.addProperty({ "name" : "friends_count", "type" : "number", required: true });
        s.addProperty({ "name" : "listed_count", "type" : "number", required: true });
        s.addProperty({ "name" : "created_at", "type" : "string", required: true });
        s.addProperty({ "name" : "favourites_count", "type" : "number", required: true });
        s.addProperty({ "name" : "utc_offset", "type" : "number", required: false });
        s.addProperty({ "name" : "time_zone", "type" : "string", required: true });
        s.addProperty({ "name" : "verified", "type" : "boolean", required: true });
        s.addProperty({ "name" : "geo_enabled", "type" : "boolean", required: true });
        s.addProperty({ "name" : "statuses_count", "type" : "number", required: true });
        s.addProperty({ "name" : "lang", "type" : "string", required: true });
        s.addProperty({ "name" : "contributors_enabled", "type" : "boolean", required: true });
        s.addProperty({ "name" : "is_translator", "type" : "boolean", required: false });
        s.addProperty({ "name" : "is_translator_enabled", "type" : "boolean", required: false });
        s.addProperty({ "name" : "profile_background_color", "type" : "string", required: true });
        s.addProperty({ "name" : "profile_background_image_url", "type" : "string", "format": "url", required: false });
        s.addProperty({ "name" : "profile_image_url_https", "type" : "string", "format" : "url", required: false });
        s.addProperty({ "name" : "profile_background_tile", "type" : "boolean", required: false });
        s.addProperty({ "name" : "profile_banner_url", "type" : "string", "format" : "url", required: false });
        s.addProperty({ "name" : "profile_link_color", "type" : "string", required: false });
        s.addProperty({ "name" : "profile_sidebar_border_color", "type" : "string", required: false });
        s.addProperty({ "name" : "profile_sidebar_fill_color", "type" : "string", required: false });
        s.addProperty({ "name" : "profile_text_color", "type" : "string", required: false });
        s.addProperty({ "name" : "profile_use_background_image", "type" : "boolean", required: false });
        s.addProperty({ "name" : "default_profile", "type" : "boolean", required: false });
        s.addProperty({ "name" : "default_profile_image", "type" : "boolean", required: false });
        s.addProperty({ "name" : "following", "type" : "boolean", required: false });
        s.addProperty({ "name" : "follow_request_sent", "type" : "boolean", required: false });
        s.addProperty({ "name" : "notifications", "type" : "boolean", required: true });        

    });

    it("should generate schema", () => {        
        objSchema = generator.build(s);
        
        expect(objSchema['id']).toBe("user");
        expect(objSchema['type']).toBe("object");
        
        compiledSchema  = ajv.compile(objSchema);      

        expect(typeof compiledSchema == 'function').toBe(true);
    });

    it("should validate against real twitter data", () => {
        let users = require('./data/users.json');
        expect(users).toHaveLength(20);

        users.forEach((user : any) => {
            let valid = compiledSchema(user);            
            expect(valid).toBe(true);       
        });
        
        
    })
});