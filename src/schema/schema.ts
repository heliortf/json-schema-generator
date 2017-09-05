
import { SchemaProperty } from './index';


export class Schema {
    /**
     * ID of the schema
     */
    id : string;

    /**
     * Type
     */
    type : string;

    /**
     * Description of the schema
     */
    description : string;

    /**
     * List of properties
     */
    properties : SchemaProperty[];

    /**
     * List of definitions used by this schema
     */
    definitions : Schema[];

    /**
     * Constructor
     */
    constructor(params? : any){
        this.description = "";
        this.type = "object";
        this.id = "";
        this.properties = [];
        this.definitions = [];

        if(typeof params == 'object'){
            
            if(typeof params['type'] == 'string' && params['type'] != ''){
                this.setType(params['type']);
            }
        }
    }

    setId(id : string){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    setType(type : string){
        this.type = type;
    }

    getType(){
        return this.type;
    }

    setDescription(description : string){
        this.description = description;
    }

    getDescription(){
        return this.description;
    }

    addProperty(p : any){
        if(!(p instanceof SchemaProperty)){
            p = new SchemaProperty(p);
        }
        this.properties.push(p);
    }

    getProperties(){
        return this.properties;
    }

    getProperty(name : string){
        let list = this.properties.filter((p : SchemaProperty) => {            
            if(p.getName() == name){
                return true;
            }
            return false;
        });

        if(list.length > 0){
            return list[0];
        }

        return false;
    }

    addDefinition(definition : Schema){        
        this.definitions.push(definition);
    }

    getDefinitions(){
        return this.definitions;
    }
}