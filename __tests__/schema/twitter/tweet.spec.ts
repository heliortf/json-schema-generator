

import 'jest';
import { Schema } from './../../../src/include';

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
    "favorited": false,
    "retweeted": false,
    "lang": "en"
  }
 */
describe("Tweet Schema", () => {

    let s = new Schema();

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
        p.setFormat("date-time");
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
        s.addProperty({ "name" : "in_reply_to_status_id", type: "number", required: false });
        let p = s.getProperty("in_reply_to_status_id");
        expect(p).not.toBe(false);        
    });

    it("should define in_reply_to_status_id_str property", () => {
        s.addProperty({ "name" : "in_reply_to_status_id_str", type: "string", required : false });
        let p = s.getProperty("in_reply_to_status_id_str");
        expect(p).not.toBe(false);        
    });
});