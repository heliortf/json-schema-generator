import 'jest';
import { Schema, SchemaProperty, SchemaGenerator } from './../../../src/include';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors : true }); // options can be passed, e.g. {allErrors: true}

describe("YouTube Channels Json Schema", () => {

    let s : Schema;
    let generator   = new SchemaGenerator();
    let objSchema = null;
    let compiledSchema = null;

    it("should initialize the basics", () => {
        s = new Schema();

        s.setId("youtubeChannels");
        s.setDescription("Youtube channels api response");
        s.setType("object");

        expect(s.getId()).toBe("youtubeChannels");
        expect(s.getDescription()).toBe("Youtube channels api response");
        expect(s.getType()).toBe("object");
        expect(s.getProperties()).toHaveLength(0);
        expect(s.getDefinitions()).toHaveLength(0);        
    });

    it("should add paging definition", () => {
        let sp : Schema = new Schema();
        sp.setId('youtubePageInfo');
        sp.addProperty({ name: "totalResults", type: "number", required: true });
        sp.addProperty({ name: "resultsPerPage", type: "number", required: true });
        
        s.addDefinition(sp);
    });

    it("should add thumbnails definition", () => {
        let stn : Schema = new Schema();
        stn.setId('youtubeChannelThumbnails');
        stn.addProperty({ 
            name : 'default', 
            type: "object", 
            properties : {
                url : { type : "string", format: "url", required: true }
            }
        });
        stn.addProperty({ 
            name : 'medium', 
            type: "object", 
            properties : {
                url : { type : "string", format: "url", required: true }
            }
        });
        stn.addProperty({ 
            name : 'high', 
            type: "object", 
            properties : {
                url : { type : "string", format: "url", required: true }
            }
        });

        // Add as definition
        s.addDefinition(stn);
    });

    it("should add localized definiton", () => {
        // Localized property
        let sl : Schema = new Schema();
        sl.setId('youtubeLocalized');
        sl.setType('object');
        sl.addProperty({ name: "title", type: "string", required: true });
        sl.addProperty({ name: "description", type: "string", required: true });

        s.addDefinition(sl);
    });

    it("should add snippet definition", () => {       
        // Channel Snippet Schema
        let snp : Schema = new Schema();
        snp.setId('youtubeChannelSnippet');
        snp.setType('object');
        snp.addProperty({ name: "title", type: "string", minLength: 2, maxLength: 255, required : true });        
        snp.addProperty({ name: "description", type: "string", minLength: 2, required : true });        
        snp.addProperty({ name: "customUrl", type: "string", minLength: 2, required : true });        
        snp.addProperty({ name: "publishedAt", type: "string", required : true });
        snp.addProperty({ name: "thumbnails", "$ref" : "youtubeChannelThumbnails"})
        snp.addProperty({ name: "localized", "$ref" : "youtubeLocalized" });

        // Add as definition
        s.addDefinition(snp);        
    });

    it("should add channel content details definition", () => {
        let scrp : Schema = new Schema({ 
            id : 'youtubeChannelContentDetails', 
            type : 'object',
            properties : {
                uploads : { type : "string" , required: true },
                watchHistory : { type : "string" , required: true },
                watchlater : { type : "string" , required: true }
            }
        });
        // Add as definition
        s.addDefinition(scrp);

        let scd : Schema = new Schema();
        scd.setId('youtubeChannelContentDetails');
        scd.setType('object');
        scd.addProperty({ name : 'relatedPlayLists', '$ref' : 'youtubeChannelRelatedPlaylists' });

        s.addDefinition(scd);
    });

    it("should add channel definition", () => {
        // Channel schema
        let su : Schema = new Schema();
        su.setId('youtubeChannel');
        su.addProperty({ name: "kind", type: "string", required: true });
        su.addProperty({ name: "etag" , type: "string", required: true });
        su.addProperty({ name: "id" , type: "string", required: true });        
        su.addProperty({ name: "snippet" , "$ref": "youtubeChannelSnippet", required: true });        

        // Add as definition
        s.addDefinition(su);


        

        
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