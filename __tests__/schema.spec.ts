import 'jest';
import { Schema } from './../src/include';

describe("Schema", () => {

    let s;

    beforeEach(() => {
        s = new Schema();
    })
    

    it("should have default properties initially", () => {
        expect(s.getProperties()).toHaveLength(0);
        expect(s.getDescription()).toBe("");
        expect(s.getType()).toBe("object");
        expect(s.getDefinitions()).toHaveLength(0);        
    });

    it("should set description", () => {
        s.setDescription("Test");
        expect(s.getDescription()).toBe("Test");
    });

    it("should set type", () => {
        s.setType("object");
    });

    it("should add properties", () => {
        let p : SchemaProperty = {
            path : "name",
            type : "string"
        };

        expect(s.addProperty(p));
    });

    it("should add definitions", () => {

    });
});