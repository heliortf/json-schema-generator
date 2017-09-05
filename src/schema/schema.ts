
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

        this.setValues(params);
    }

    setValues(params : any){
        let self = this;

        if(typeof params == 'object'){
            if(typeof params['type'] == 'string' && params['type'] != ''){
                this.setType(params['type']);
            }

            if(typeof params['id'] == 'string' && params['id'] != ''){
                this.setId(params['id']);
            }

            if(typeof params['properties'] == 'object' && Object.keys(params['properties']).length > 0){                
                let keys = Object.keys(params['properties']);

                let properties = keys.forEach((key : string) => {
                    self.addProperty(params['properties'][key]);
                });
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