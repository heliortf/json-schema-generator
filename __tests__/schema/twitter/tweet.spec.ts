

import 'jest';
import { Schema, SchemaProperty, SchemaGenerator } from './../../../src/include';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors : true }); // options can be passed, e.g. {allErrors: true}

/**
 * Example of the object:
 * 
 * {
    "created_at": "Tue Mar 21 20:50:14 +0000 2006",
    "id": 20,
    "id_str": "20",
    "text": "just setting up my twttr",
    "source": "web",
    "truncated": false,
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 12,
      "id_str": "12",
      "name": "Jack Dorsey",
      "screen_name": "jack",
      "location": "California",
      "description": "",
      "url": null,
      "entities": {
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 2577282,
      "friends_count": 1085,
      "listed_count": 23163,
      "created_at": "Tue Mar 21 20:50:14 +0000 2006",
      "favourites_count": 2449,
      "utc_offset": -25200,
      "time_zone": "Pacific Time (US & Canada)",
      "geo_enabled": true,
      "verified": true,
      "statuses_count": 14447,
      "lang": "en",
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "EBEBEB",
      "profile_background_image_url": "http://abs.twimg.com/images/themes/theme7/bg.gif",
      "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme7/bg.gif",
      "profile_background_tile": false,
      "profile_image_url": "http://pbs.twimg.com/profile_images/448483168580947968/pL4ejHy4_normal.jpeg",
      "profile_image_url_https": "https://pbs.twimg.com/profile_images/448483168580947968/pL4ejHy4_normal.jpeg",
      "profile_banner_url": "https://pbs.twimg.com/profile_banners/12/1347981542",
      "profile_link_color": "990000",
      "profile_sidebar_border_color": "DFDFDF",
      "profile_sidebar_fill_color": "F3F3F3",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "default_profile": false,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "retweet_count": 23936,
    "favorite_count": 21879,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "urls": [],
      "user_mentions": []
    },

    // ta aqui
    "favorited": false,
    "retweeted": false,
    "lang": "en"
  }
 */
describe("Tweet Schema", () => {

    let s = new Schema();
    let generator   = new SchemaGenerator();
    let objSchema = null;
    let compiledSchema = null;

    /**
     * Nullable number
     */
    let sn = new Schema();
    

    it("should define", () => {
        s.setId("twitter-tweet.json");
        s.setType("object");

        expect(s.getId()).toBe("twitter-tweet.json");
        expect(s.getType()).toBe("object");
        expect(s.getProperties()).toHaveLength(0);
    })

    it("should define created_at property", () => {
        let p = new SchemaProperty();
        p.setName("created_at");
        p.setType("string");
        p.setRequired(true);

        s.addProperty(p);

        expect(s.getProperties()).toHaveLength(1);
        expect(s.getProperty("created_at")).not.toBe(false);
    });

    it("should define id property", () => {
        let p = new SchemaProperty({ name : "id", type : "number", required : true });
        s.addProperty(p);

        expect(s.getProperties()).toHaveLength(2);
        expect(s.getProperty("id")).not.toBe(false);
    });

    it("should define id_str property", () => {
        let p = new SchemaProperty();
        p.setValues({
            "name"      : "id_str",
            "type"      : "string",
            "required"  : true
        });
        s.addProperty(p);
        expect(s.getProperty("id_str")).not.toBe(false);
    });

    it("should define text property", () => {
        s.addProperty(new SchemaProperty({ "name" : "text", "type": "string", required: true }));
        var textProperty = s.getProperty("text");
        
        expect(textProperty).not.toBe(false);
        expect(textProperty.getName()).toBe("text");
        
    });

    
    it("should define source property", () => {
        s.addProperty(new SchemaProperty({ "name" : "source", "type": "string", required: true }));
        var sourceProperty = s.getProperty("source");
        
        expect(sourceProperty).not.toBe(false);
        expect(sourceProperty.getName()).toBe("source");        
    });


    it("should define truncated property", () => {
        s.addProperty({ "name" : "truncated", type: "boolean", required: true });
        
        let p = s.getProperty("truncated");
        expect(p.getName()).toBe("truncated");
        expect(p.isRequired()).toBe(true);
        expect(p.getType()).toBe("boolean");
    });


    it("should define in_reply_to_status_id property", () => {
        
        s.addProperty({ 
            "name" : "in_reply_to_status_id",              
            "anyOf" : [
                new Schema({ "type" : "number" }),
                new Schema({ "type" : "null" })
            ], 
            required: false 
        });

        let p = s.getProperty("in_reply_to_status_id");
        expect(p).not.toBe(false);        
    });


    it("should define in_reply_to_status_id_str property", () => {
        s.addProperty({ 
            "name" : "in_reply_to_status_id_str", 
            "anyOf": [
                new Schema({ "type" : "string" }),
                new Schema({ "type" : "null" })
            ],
            required : false 
        });
        let p = s.getProperty("in_reply_to_status_id_str");
        expect(p).not.toBe(false);        
    });

    
    it("should define in_reply_to_user_id property", () => {
        s.addProperty({ 
            "name" : "in_reply_to_user_id", 
            "anyOf" : [
                new Schema({ "type" : "number" }),
                new Schema({ "type" : "null" })
            ], 
            required : false 
        });
        let p = s.getProperty("in_reply_to_user_id");
        expect(p).not.toBe(false);        
    });
    
    
    
    it("should define in_reply_to_user_id_str property", () => {
        s.addProperty({ 
            "name" : "in_reply_to_user_id_str", 
            "anyOf": [
                new Schema({ "type" : "string" }),
                new Schema({ "type" : "null" })
            ],
            required : false 
        });
        let p = s.getProperty("in_reply_to_user_id_str");
        expect(p).not.toBe(false);        
    });

    
    
    it("should define in_reply_to_screen_name property", () => {
        s.addProperty({ 
            "name" : "in_reply_to_screen_name", 
            "anyOf": [
                new Schema({ "type" : "string" }),
                new Schema({ "type" : "null" })
            ], 
            required : false 
        });
        let p = s.getProperty("in_reply_to_screen_name");
        expect(p).not.toBe(false);        
    });

    
    
    it("should define favorited property", () => {
        s.addProperty({ "name" : "favorited", type: "boolean", required : true });
        let p = s.getProperty("favorited");
        expect(p).not.toBe(false);        
    });

    
    it("should define retweeted property", () => {
        s.addProperty({ "name" : "retweeted", type: "boolean", required : true });
        let p = s.getProperty("retweeted");
        expect(p).not.toBe(false);        
    });

    
    it("should define lang property", () => {
        s.addProperty({ "name" : "lang", type: "string", required : true });
        let p = s.getProperty("lang");
        expect(p).not.toBe(false);        
    });


    it("should define 'retweet_count' property", () => {
        s.addProperty({ "name" : "retweet_count", type: "number", required : true });
        let p = s.getProperty("retweet_count");
        expect(p).not.toBe(false);        
    });

    
    it("should define 'favorite_count' property", () => {
        s.addProperty({ "name" : "favorite_count", type: "number", required : true });
        let p = s.getProperty("favorite_count");
        expect(p).not.toBe(false);        
    });


    it("should add user definition and property", () => {

        s.addProperty({
            "name" : "user",
            "$ref" : "user"
        });

        let s2 = new Schema();
        s2.setId("user");
        s2.addProperty({ "name" : "id", "type" : "number", required: true });
        s2.addProperty({ "name" : "id_str", "type" : "string", required: true });
        s2.addProperty({ "name" : "name", "type" : "string", required: true });
        s2.addProperty({ "name" : "screen_name", "type" : "string", required: true });
        s2.addProperty({ "name" : "location", "type" : "string", required: true });
        s2.addProperty({ "name" : "description", "type" : "string", required: false });
        s2.addProperty({ "name" : "url", "type" : "string", required: false });
        s2.addProperty({ "name" : "protected", "type" : "boolean", required: true });
        s2.addProperty({ "name" : "followers_count", "type" : "number", required: true });
        s2.addProperty({ "name" : "friends_count", "type" : "number", required: true });
        s2.addProperty({ "name" : "listed_count", "type" : "number", required: true });
        s2.addProperty({ "name" : "created_at", "type" : "string", required: true });
        s2.addProperty({ "name" : "favourites_count", "type" : "number", required: true });
        s2.addProperty({ "name" : "utc_offset", "type" : "number", required: false });
        s2.addProperty({ "name" : "time_zone", "type" : "string", required: true });
        s2.addProperty({ "name" : "verified", "type" : "boolean", required: true });
        s2.addProperty({ "name" : "geo_enabled", "type" : "boolean", required: true });
        s2.addProperty({ "name" : "statuses_count", "type" : "number", required: true });
        s2.addProperty({ "name" : "lang", "type" : "string", required: true });
        s2.addProperty({ "name" : "contributors_enabled", "type" : "boolean", required: true });
        s2.addProperty({ "name" : "is_translator", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "is_translator_enabled", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "profile_background_color", "type" : "string", required: true });
        s2.addProperty({ "name" : "profile_background_image_url", "type" : "string", "format": "uri", required: false });
        s2.addProperty({ "name" : "profile_image_url_https", "type" : "string", "format" : "uri", required: false });
        s2.addProperty({ "name" : "profile_background_tile", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "profile_banner_url", "type" : "string", "format" : "uri", required: false });
        s2.addProperty({ "name" : "profile_link_color", "type" : "string", required: false });
        s2.addProperty({ "name" : "profile_sidebar_border_color", "type" : "string", required: false });
        s2.addProperty({ "name" : "profile_sidebar_fill_color", "type" : "string", required: false });
        s2.addProperty({ "name" : "profile_text_color", "type" : "string", required: false });
        s2.addProperty({ "name" : "profile_use_background_image", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "default_profile", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "default_profile_image", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "following", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "follow_request_sent", "type" : "boolean", required: false });
        s2.addProperty({ "name" : "notifications", "type" : "boolean", required: false });        

        s.addDefinition(s2);
    });

    it("should generate schema", () => {
        
        objSchema = generator.build(s);
        
        expect(objSchema['id']).toBe("twitter-tweet.json");
        expect(objSchema['type']).toBe("object");
        expect(objSchema['properties']['user']['$ref']).toBeDefined();
        compiledSchema  = ajv.compile(objSchema);      

        expect(typeof compiledSchema == 'function').toBe(true);
    });

    it("should validate against real twitter data", () => {
        let tweets = require('./data/tweets.json');
        expect(tweets).toHaveLength(200);

        tweets.forEach((tweet : any) => {
            let valid = compiledSchema(tweets[0]);            
            expect(valid).toBe(true);       
        });
        
        
    })
});