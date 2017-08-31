import 'jest';
import { Schema } from './../src/include';

describe("Schema Property", () => {

    let s;

    beforeEach(() => {
        s = new SchemaProperty();
    });
    
    it("should have default properties initially", () => {
        expect(s.getName()).toBe("");
        expect(s.isRequired()).toBe(false);
        expect(s.getType()).toBe("string");
    });

    it("should permit set name", () => {
        s.setName("description");
        expect(s.getName()).toBe("description");
    });

    it("should permit set type", () => {
        s.setType("number");
        expect(s.getType()).toBe("number");
    });

    it("should permit set enum type", () => {
        s.setType("enum", ["first_value", "second_value"]);
        expect(s.getType()).toBe(["first_value", "second_value"]);
    });

    it("should permit set as required", () => {
        s.setRequired(true);
        expect(s.isRequired()).toBe(true);
    });
});