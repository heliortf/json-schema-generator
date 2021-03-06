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

        s.setId("facebookPosts");
        s.setDescription("Facebook page's posts api response");
        s.setType("object");

        expect(s.getId()).toBe("facebookPosts");
        expect(s.getDescription()).toBe("Facebook page's posts api response");
        expect(s.getType()).toBe("object");
        expect(s.getProperties()).toHaveLength(0);
        expect(s.getDefinitions()).toHaveLength(0);        
    });

    it("should add paging definition", () => {
        let sp : Schema = new Schema();
        sp.setId('facebookPaging');
        sp.addProperty({ name: "next", type: "string", format : "url", required: true });
        sp.addProperty({ name: "cursors", '$ref' : 'facebookCursors' });

        let sc : Schema = new Schema();
        sc.setId('facebookCursors');
        sc.addProperty({ name : "before", type: "string", required : true });
        sc.addProperty({ name : "after", type: "string", required: true });

        s.addDefinition(sc);
        s.addDefinition(sp);
    });

    it("should add post definition", () => {
        // POST's "From" schema
        let su : Schema = new Schema();
        su.setId('facebookUser');
        su.addProperty({ name: "name", type: "string", required: true });
        su.addProperty({ name: "id" , type: "string", required: true });
        su.addProperty({ name: "profile_type", type: "string", required: false });

        // POST's Likes schema
        let sl : Schema = new Schema();
        sl.setId('facebookLikes');
        sl.setType("object");
        sl.addProperty({ name: 'data', type: "array", items: { "$ref" : "facebookUser" }, required: true});
        sl.addProperty({ name: 'paging', "$ref" : "facebookPaging", required: true });

        // POST schema
        let sp : Schema = new Schema();
        sp.setId('facebookPost');
        sp.setType('object');
        sp.addProperty({ name: "message", type: "string", required : true });
        sp.addProperty({ name: "message_tags", type: "array", items: { type: "string" } });
        sp.addProperty({ name: "created_time", type: "string" });
        sp.addProperty({ name: "from", "$ref": "facebookUser" });
        sp.addProperty({ name: "likes", type: "object", "$ref" : "facebookLikes" });
        sp.addProperty({ name: "type", type: "string" });
        sp.addProperty({ name: "permalink_url", type: "string", format: "url" });
        sp.addProperty({ name: "name", type: "string" });
        sp.addProperty({ name: "link", type: "string", format: "url", required: true });
        sp.addProperty({ name: "id", type: "string", required: true });

        s.addDefinition(su);
        s.addDefinition(sl);
        s.addDefinition(sp);
    });

    it("should add root schema properties", () => {
        s.addProperty({ name: "data", type: "array", items : { "$ref" : "facebookPost" }, required : true });
        s.addProperty({ name: "paging", "$ref" : "facebookPaging", required: true });
    });

    it("should generate schema and validate data", () => {

        
        objSchema = generator.build(s);
        /*console.log("POSTS SCHEMA:\n\n");
        console.log(JSON.stringify(objSchema));
        console.log("\n\n");*/

        expect(objSchema['id']).toBe("facebookPosts");
        expect(objSchema['type']).toBe("object");
        expect(objSchema['properties']['data']).toBeDefined();
        expect(objSchema['properties']['paging']).toBeDefined();
        //console.log(objSchema);
        compiledSchema  = ajv.compile(objSchema);      

        expect(typeof compiledSchema == 'function').toBe(true);
    });

    it("should validate against real facebook data", () => {
        let posts = require('./data/posts.json');
        expect(posts.data).toHaveLength(100);
        let valid = compiledSchema(posts);            
        /*console.log("Valid = "+valid);
        console.log(compiledSchema.errors);*/
        expect(valid).toBe(true);
        /*posts.data.forEach((post : any) => {
            //console.log(post);
            let valid = compiledSchema(post);            
            console.log("Valid = "+valid);
            //console.log(compiledSchema.errors)
            expect(valid).toBe(true);       
        });*/
    });
});