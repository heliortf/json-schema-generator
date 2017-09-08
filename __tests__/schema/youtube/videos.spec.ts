import 'jest';
import { Schema, SchemaProperty, SchemaGenerator } from './../../../src/include';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors : true }); // options can be passed, e.g. {allErrors: true}

describe("YouTube Videos Json Schema", () => {

    let s : Schema;
    let generator   = new SchemaGenerator();
    let objSchema = null;
    let compiledSchema = null;

    it("should initialize the basics", () => {
        s = new Schema();

        s.setId("youtubeVideos");
        s.setDescription("Youtube videos api response");
        s.setType("object");

        expect(s.getId()).toBe("youtubeVideos");
        expect(s.getDescription()).toBe("Youtube videos api response");
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
        stn.setId('youtubeVideoThumbnails');
        stn.addProperty({ 
            name : 'default', 
            type: "object", 
            properties : {
                url : { type : "string", format: "url", required: true },
                width: { type : "number", required: true },
                height: { type : "number", required: true }
            }
        });
        stn.addProperty({ 
            name : 'medium', 
            type: "object", 
            properties : {
                url : { type : "string", format: "url", required: true },
                width: { type : "number", required: true },
                height: { type : "number", required: true }
            }
        });
        stn.addProperty({ 
            name : 'high', 
            type: "object", 
            properties : {
                url : { type : "string", format: "url", required: true },
                width: { type : "number", required: true },
                height: { type : "number", required: true }
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
        // Video Snippet Schema
        let snp : Schema = new Schema();
        snp.setId('youtubeVideoSnippet');
        snp.setType('object');
        snp.addProperty({ name: "title", type: "string", minLength: 2, maxLength: 255, required : true });        
        snp.addProperty({ name: "description", type: "string", required : true });        
        //snp.addProperty({ name: "customUrl", type: "string", minLength: 2, required : false });        
        snp.addProperty({ name: "publishedAt", type: "string", required : true });
        snp.addProperty({ name: "liveBroadcastContent", type: "string", required : true });
        snp.addProperty({ name: "channelId", type: "string", required : true });
        snp.addProperty({ name: "channelTitle", type: "string", required : true });
        snp.addProperty({ name: "tags", type: "array", items: { type: "string" }, required : true });
        snp.addProperty({ name: "categoryId", type: "string", required : true });
        snp.addProperty({ name: "thumbnails", "$ref" : "youtubeVideoThumbnails"})
        snp.addProperty({ name: "localized", "$ref" : "youtubeLocalized" });

        // Add as definition
        s.addDefinition(snp);        
    });

    it("should add channel content details definition", () => {
        let scrp : Schema = new Schema({ 
            id : 'youtubeVideoContentDetails', 
            type : 'object',
            properties : {
                duration : { type : "string" , required: true },
                dimension : { type : "string" , required: true },
                definition : { type : "string" , required: true },
                caption : { type : "string" , required: true },
                licensedContent : { type : "boolean" , required: true },
                projection : { type : "string" , required: true }
            }
        });
        // Add as definition
        s.addDefinition(scrp);
    });

    
    it("should add video player", () => {
        let svp : Schema = new Schema({ 
            id : 'youtubeVideoPlayer', 
            type : 'object',
            properties : {
                embedHtml : { type : "string" , required: true }
            }
        });
        // Add as definition
        s.addDefinition(svp);
    });

    it("should add channel definition", () => {
        // Video schema
        let su : Schema = new Schema();
        su.setId('youtubeVideo');
        su.addProperty({ name: "kind", type: "string", required: true });
        su.addProperty({ name: "etag" , type: "string", required: true });
        su.addProperty({ name: "id" , type: "string", required: true });        
        su.addProperty({ name: "snippet" , "$ref": "youtubeVideoSnippet", required: true });        
        su.addProperty({ name: "contentDetails" , "$ref": "youtubeVideoContentDetails", required: true });  
        su.addProperty({ name: "player" , "$ref": "youtubeVideoPlayer", required: true });                     

        // Add as definition
        s.addDefinition(su);                
    });

    it("should add root schema properties", () => {
        s.addProperty({ name: "items", type: "array", items : { "$ref" : "youtubeVideo" }, required : true });
        s.addProperty({ name: "pageInfo", "$ref" : "youtubePageInfo", required: true });
    });

    it("should generate schema and validate data", () => {

        
        objSchema = generator.build(s);
        console.log("VIDEOS SCHEMA:\n\n");
        console.log(JSON.stringify(objSchema));
        console.log("\n\n");

        expect(objSchema['id']).toBe("youtubeVideos");
        expect(objSchema['type']).toBe("object");
        expect(objSchema['properties']['items']).toBeDefined();
        expect(objSchema['properties']['pageInfo']).toBeDefined();

        let defs = objSchema['definitions'];
        
        /**
         * Facebook Comments
         */
        /*let defComment = objSchema['definitions']['facebookComment'];

        // Expect that the following fields are required
        expect(defComment.required).toEqual(expect.arrayContaining(['message', 'id', 'created_time']));

        // Expect that the message field has minLength and maxLength
        expect(defComment.properties.message.minLength).toBe(2);
        expect(defComment.properties.message.maxLength).toBeGreaterThan(100);*/

        //console.log(objSchema);
        compiledSchema  = ajv.compile(objSchema);      

        expect(typeof compiledSchema == 'function').toBe(true);
    });

    it("should validate against real youtube data", () => {
        let videos = require('./data/videos.json');
        expect(videos.items).toHaveLength(5);
        let valid = compiledSchema(videos);

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