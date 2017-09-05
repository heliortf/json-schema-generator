
import { Schema } from './index';

export class SchemaProperty {
    /**
     * Name of the property
     */
    name : string;

    /**
     * Type of the property. Can be:
     * 
     * string | array | object
     */
    type : string;

    /**
     * Indicates that the property is required
     */
    required : boolean;

    /**
     * Array of valid strings
     */
    enum : string[];    

    /**
     * List of schemas
     */
    oneOf : Schema[];

    /**
     * List of schemas
     */
    anyOf : Schema[];

    /**
     * Regex string
     */
    pattern : string;

    /**
     * Format of the string
     */
    format : string;

    /**
     * Applied to strings
     */
    minLength : number;

    /**
     * Applied to strings
     */
    maxLength : number;

    /**
     * Used in array type
     */
    items : any;

    /**
     * Reference to a definition
     */
    ref : string;

    constructor(params? : any){
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

    setValues(params : any){
        if(typeof params != 'undefined'){

            if(typeof params['name'] == 'string' && params['name'] != ''){
                this.setName(params['name']);
            }

            if(typeof params['format'] == 'string' && params['format'] != ''){
                this.setFormat(params['format']);
            }

            if(typeof params['minLength'] == 'number' && params['minLength'] >= 0){
                this.setMinLength(params['minLength']);
            }

            if(typeof params['maxLength'] == 'number' && params['maxLength'] > 0){
                this.setMaxLength(params['maxLength']);
            }

            if(typeof params['type'] == 'string' && params['type'] != ''){
                this.setType(params['type']);
            }

            if(typeof params['required'] == 'boolean'){
                this.setRequired(params['required']);
            }

            if(typeof params['anyOf'] == 'object' && params['anyOf'] instanceof Array){
                this.setType('anyOf');
                this.setAnyOf(params['anyOf'])
            }

            if(typeof params['$ref'] == 'string' && params['$ref'] != ''){
                this.setType('$ref');
                this.setRef(params['$ref']);                
            }

            if(typeof params['items'] == 'object' && Object.keys(params['items']).length > 0){
                this.setType('array');
                this.setItems(new SchemaProperty(params['items']));
            }
        }
    }

    setName(name : string){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setType(type : string, enumValues? : string[]){
        this.type = type;

        if(type == 'enum' && typeof enumValues != 'undefined'){
            this.enum = enumValues;
        }
    }
    
    getType(){
        return this.type;
    }

    setRequired(required : boolean){
        this.required = required;
    }

    isRequired(){
        return this.required;
    }

    setFormat(format : string){
        this.format = format;
    }

    getFormat(){
        return this.format;
    }

    setMinLength(length : number){
        this.minLength = length;
    }

    getMinLength(){
        return this.minLength;
    }

    setMaxLength(length : number){
        this.maxLength = length;
    }

    getMaxLength(){
        return this.maxLength;
    }

    getEnum(){
        return this.enum;
    }

    setAnyOf(schemas : Schema[]){
        this.anyOf = schemas;
    }

    getAnyOf(){
        return this.anyOf;
    }

    getRef(){
        return this.ref;
    }

    setRef(ref : string){
        this.ref = ref;
    }

    setItems(items : any){
        this.items = items;
    }

    getItems(){
        return this.items;
    }
}