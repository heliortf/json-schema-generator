import 'jest';
import { Schema, SchemaProperty, SchemaGenerator } from './../../../src/include';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors : true }); // options can be passed, e.g. {allErrors: true}

describe("Facebook Posts Json Schema", () => {

    let s : Schema;
    let generator   = new SchemaGenerator();
    let objSchema = null;
    let compiledSchema = null;

    it("should initialize the basics", () => {
        s = new Schema();

        s.setId("facebook-posts");
        s.setDescription("Facebook page's posts api response");
        s.setType("object");

        expect(s.getId()).toBe("facebook-posts");
        expect(s.getDescription()).toBe("Facebook page's posts api response");
        expect(s.getType()).toBe("object");
        expect(s.getProperties()).toHaveLength(0);
        expect(s.getDefinitions()).toHaveLength(0);        
    });

    it("should add paging definition", () => {
        let sp : Schema = new Schema();
        sp.setId('facebook-paging');
        sp.addProperty({ name: "next", type: "string", format : "uri" });
        sp.addProperty({ name: "cursors", '$ref' : 'facebook-cursors' });

        let sc : Schema = new Schema();
        sc.setId('facebook-cursors');
        sc.addProperty({ name : "before", type: "string" });
        sc.addProperty({ name : "after", type: "string" });

        s.addDefinition(sc);
        s.addDefinition(sp);
    });

    it("should add post definition", () => {
        // POST's "From" schema
        let su : Schema = new Schema();
        su.setId('facebook-user');
        su.addProperty({ name: "name", type: "string", required: true });
        su.addProperty({ name: "id" , type: "string", required: true });
        su.addProperty({ name: "profile_type", type: "string", required: false });

        // POST's Likes schema
        let sl : Schema = new Schema();
        sl.setId('facebook-likes');
        sl.addProperty({ name: 'data', type: "array", items: { "$ref" : "facebook-user" }});
        sl.addProperty({ name: 'paging', "$ref" : "facebook-paging" });

        // POST schema
        let sp : Schema = new Schema();
        sp.setId('facebook-post');
        sp.addProperty({ name: "message", type: "string" });
        sp.addProperty({ name: "message_tags", type: "array", items: { type: "string" } });
        sp.addProperty({ name: "created_time", type: "string", format: "date-time" });
        sp.addProperty({ name: "from", "$ref": "facebook-user" });
        sp.addProperty({ name: "likes", type: "array", items: { "$ref" : "facebook-likes" }});
        sp.addProperty({ name: "type", type: "string" });
        sp.addProperty({ name: "permalink_url", type: "string", format: "uri" });
        sp.addProperty({ name: "name", type: "string" });
        sp.addProperty({ name: "link", type: "string", format: "uri", required: true });
        sp.addProperty({ name: "id", type: "string", required: true });

        s.addDefinition(su);
        s.addDefinition(sl);
        s.addDefinition(sp);
    });

    it("should add root schema properties", () => {
        s.addProperty({ name: "data", type: "array", items : { "$ref" : "facebook-post" }});
        s.addProperty({ name: "paging", "$ref" : "facebook-paging" });
    });

    it("should generate schema and validate data", () => {
        objSchema = generator.build(s);
        
        expect(objSchema['id']).toBe("facebook-posts");
        expect(objSchema['type']).toBe("object");
        expect(objSchema['properties']['data']).toBeDefined();
        expect(objSchema['properties']['paging']).toBeDefined();
        compiledSchema  = ajv.compile(objSchema);      

        expect(typeof compiledSchema == 'function').toBe(true);
    });

    it("should validate against real facebook data", () => {
        let posts = require('./data/posts.json');
        expect(posts).toHaveLength(100);

        posts.forEach((post : any) => {
            let valid = compiledSchema(post);            
            expect(valid).toBe(true);       
        });
    });
});