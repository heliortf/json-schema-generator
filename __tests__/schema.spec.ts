import 'jest';
import { Schema, SchemaProperty } from './../src/include';

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
        expect(s.getType()).toBe("object");
    });

    it("should set id", () => {
        s.setId("schema.json");
        expect(s.getId()).toBe("schema.json");
    });

    it("should add properties", () => {
        let p : SchemaProperty = new SchemaProperty({
            name : "description",
            type : "string",
            required: true
        });
        s.addProperty(p)
        expect(s.getProperties()).toHaveLength(1);
    });

    it("should add definitions", () => {        
        expect(s.getDefinitions()).toHaveLength(0);

        let d = new Schema();
        d.setType("object");
        d.addProperty(new SchemaProperty({
            'name'      : 'address',
            'type'      : 'string',
            'required'  : true
        }));
        expect(d.getProperties()).toHaveLength(1);

        s.addDefinition(d);        
        expect(s.getDefinitions()).toHaveLength(1);
    });
});