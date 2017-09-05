import 'jest';
import { Schema, SchemaProperty, SchemaGenerator } from './../../../src/include';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors : true }); // options can be passed, e.g. {allErrors: true}

describe("Facebook Comments Json Schema", () => {

    let s : Schema;
    let generator   = new SchemaGenerator();
    let objSchema = null;
    let compiledSchema = null;

    it("should initialize the basics", () => {
        s = new Schema();

        s.setId("facebookComments");
        s.setDescription("Facebook post's comments api response");
        s.setType("object");

        expect(s.getId()).toBe("facebookComments");
        expect(s.getDescription()).toBe("Facebook post's comments api response");
        expect(s.getType()).toBe("object");
        expect(s.getProperties()).toHaveLength(0);
        expect(s.getDefinitions()).toHaveLength(0);        
    });

    it("should add paging definition", () => {
        let sp : Schema = new Schema();
        sp.setId('facebookPaging');
        sp.addProperty({ name: "next", type: "string", format : "url" });
        sp.addProperty({ name: "cursors", '$ref' : 'facebookCursors' });

        let sc : Schema = new Schema();
        sc.setId('facebookCursors');
        sc.addProperty({ name : "before", type: "string", required : true });
        sc.addProperty({ name : "after", type: "string", required: true });

        s.addDefinition(sc);
        s.addDefinition(sp);
    });

    it("should add comment definition", () => {
        // POST's "From" schema
        let su : Schema = new Schema();
        su.setId('facebookUser');
        su.addProperty({ name: "name", type: "string", required: true });
        su.addProperty({ name: "id" , type: "string", required: true });
        su.addProperty({ name: "profile_type", type: "string", required: false });

        // POST schema
        let sp : Schema = new Schema();
        sp.setId('facebookComment');
        sp.setType('object');
        sp.addProperty({ name: "message", type: "string", minLength: 2, maxLength: 1024, required : true });        
        sp.addProperty({ name: "created_time", type: "string", required : true });
        sp.addProperty({ name: "from", "$ref": "facebookUser" });
        sp.addProperty({ name: "id", type: "string", required: true });

        s.addDefinition(su);        
        s.addDefinition(sp);
    });

    it("should add root schema properties", () => {
        s.addProperty({ name: "data", type: "array", items : { "$ref" : "facebookComment" }, required : true });
        s.addProperty({ name: "paging", "$ref" : "facebookPaging", required: true });
    });

    it("should generate schema and validate data", () => {

        
        objSchema = generator.build(s);
        console.log("POSTS SCHEMA:\n\n");
        console.log(JSON.stringify(objSchema));
        console.log("\n\n");

        expect(objSchema['id']).toBe("facebookComments");
        expect(objSchema['type']).toBe("object");
        expect(objSchema['properties']['data']).toBeDefined();
        expect(objSchema['properties']['paging']).toBeDefined();

        let defs = objSchema['definitions'];
        
        /**
         * Facebook Comments
         */
        let defComment = objSchema['definitions']['facebookComment'];

        // Expect that the following fields are required
        expect(defComment.required).toEqual(expect.arrayContaining(['message', 'id', 'created_time']));

        // Expect that the message field has minLength and maxLength
        expect(defComment.properties.message.minLength).toBe(2);
        expect(defComment.properties.message.maxLength).toBeGreaterThan(100);

        //console.log(objSchema);
        compiledSchema  = ajv.compile(objSchema);      

        expect(typeof compiledSchema == 'function').toBe(true);
    });

    it("should validate against real facebook data", () => {
        let posts = require('./data/comments.json');
        expect(posts.data).toHaveLength(7);
        let valid = compiledSchema(posts);

        if(!valid){            
            console.log(compiledSchema.errors);            
        }

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