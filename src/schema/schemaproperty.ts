
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
}