
import { Schema } from "./index";

export class SchemaProperty {
    /**
     * Name of the property
     */
    public name: string;

    /**
     * Type of the property. Can be:
     *
     * string | array | object
     */
    public type: string;

    /**
     * Indicates that the property is required
     */
    public required: boolean;

    /**
     * Array of valid strings
     */
    public enum: string[];

    /**
     * List of schemas
     */
    public oneOf: Schema[];

    /**
     * List of schemas
     */
    public anyOf: Schema[];

    /**
     * Regex string
     */
    public pattern: string;

    /**
     * Format of the string
     */
    public format: string;

    /**
     * Applied to strings
     */
    public minLength: number;

    /**
     * Applied to strings
     */
    public maxLength: number;

    /**
     * Used in array type
     */
    public items: any;

    /**
     * Reference to a definition
     */
    public ref: string;

    constructor(params?: any) {
        this.required = false;
        this.enum = [];
        this.oneOf = [];
        this.name = "";
        this.type = "string";
        this.format = "";
        this.minLength = null;
        this.maxLength = null;

        this.setValues(params);
    }

    public setValues(params: any) {
        if (typeof params !== "undefined"){

            if (typeof params.name === "string" && params.name !== ""){
                this.setName(params.name);
            }

            if (typeof params.format === "string" && params.format !== ""){
                this.setFormat(params.format);
            }

            if (typeof params.minLength === "number" && params.minLength >= 0){
                this.setMinLength(params.minLength);
            }

            if (typeof params.maxLength === "number" && params.maxLength > 0){
                this.setMaxLength(params.maxLength);
            }

            if (typeof params.type === "string" && params.type !== ""){
                this.setType(params.type);
            }

            if (typeof params.required === "boolean"){
                this.setRequired(params.required);
            }

            if (typeof params.anyOf === "object" && params.anyOf instanceof Array){
                this.setType("anyOf");
                this.setAnyOf(params.anyOf);
            }

            if (typeof params.$ref === "string" && params.$ref !== ""){
                this.setType("$ref");
                this.setRef(params.$ref);
            }

            if (typeof params.items === "object" && Object.keys(params.items).length > 0){
                this.setType("array");
                this.setItems(new SchemaProperty(params.items));
            }
        }
    }

    public setName(name: string){
        this.name = name;
    }

    public getName(){
        return this.name;
    }

    public setType(type: string, enumValues?: string[]){
        this.type = type;

        if (type == "enum" && typeof enumValues != "undefined"){
            this.enum = enumValues;
        }
    }

    public getType(){
        return this.type;
    }

    public setRequired(required: boolean){
        this.required = required;
    }

    public isRequired(){
        return this.required;
    }

    public setFormat(format: string){
        this.format = format;
    }

    public getFormat(){
        return this.format;
    }

    public setMinLength(length: number){
        this.minLength = length;
    }

    public getMinLength(){
        return this.minLength;
    }

    public setMaxLength(length: number){
        this.maxLength = length;
    }

    public getMaxLength(){
        return this.maxLength;
    }

    public getEnum(){
        return this.enum;
    }

    public setAnyOf(schemas: Schema[]){
        this.anyOf = schemas;
    }

    public getAnyOf(){
        return this.anyOf;
    }

    public getRef(){
        return this.ref;
    }

    public setRef(ref: string){
        this.ref = ref;
    }

    public setItems(items: any){
        this.items = items;
    }

    public getItems(){
        return this.items;
    }
}
