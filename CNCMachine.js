const NAME_PROPERTY_STATUS = "status";
const NAME_PROPERTY_CHECK_INPUT = "CheckInput";
const NAME_PROPERTY_LOG_FILE_STORAGE_CAPACITY = "LogFileStorageCapacity";
const NAME_PROPERTY_VOLTAGE_CHECK = "VoltageCheck";
const NAME_PROPERTY_TEMPERATURE_CHECK = "TemperatureCheck";
const NAME_ACTION_TOGGLE = "toggle";

let thing = WoT.produce({
        title: "CNCMachine",
        description: "Basic Functionality with CNC Machine data",
        "@context": ["https://www.w3.org/2019/wot/td/v1", 
				{"cov": "http://www.example.org/coap-binding#"}],
    });

thing.addProperty(
	NAME_PROPERTY_STATUS,
	{
		type: "string",
		description: "Provides current status of the Machine",
		enum: ["on","Off","idle/ProductionComplte", 
					"ProductionInProgress", "Error"],
		observable: true,                                                       
        readOnly: true
	},
	"idle");
thing.addProperty(
	NAME_PROPERTY_CHECK_INPUT,
	{
		description : "Returns percentage of material available",
		type: "number",
		minimum: 0.0,
		maximum: 100.0,
		observable: true,                                                       
		readOnly : true
	},
	0.0);
thing.addProperty(
	NAME_PROPERTY_LOG_FILE_STORAGE_CAPACITY,
	{
		description : "Returns percentage of memory available",
		type: "number",
		minimum: 0.0,
		maximum: 100.0,
		observable: true,                                                       
		readOnly : true
	},
	100.0);
thing.addProperty(
	NAME_PROPERTY_VOLTAGE_CHECK,
	{
		description : "Returns about the voltage input",
		type: "string",
        enum: ["High", "Normal", "Low"],
		observable: true,                                                       
		readOnly : true
	},
	100.0);
thing.addProperty(
	NAME_PROPERTY_TEMPERATURE_CHECK,
	{
		description : "Returns the temperature of the machine in Celcius",
		type: "number",
		minimum: -2000.0,
		maximum: 2000.0,
		observable: true,                                                       
		readOnly : true
	},
	2000.0);

thing.addAction(                                                                
    NAME_ACTION_TOGGLE,                                                      
    {
		description: "Turn off or on the system",
		uriVariables: {
			step: {
				"type": "string", 
				"enum": ["On","Off"]
			}
		}
	},                                                                         
    (data, options) => {                                                                     
		console.log(options);                                            
        return thing.properties[NAME_PROPERTY_STATUS].read().then(() => {  
			let step = "Off";                                                       
            if(options && 'uriVariables' in options) {                          
                let uriVariables = options['uriVariables'];                     
                if('step' in uriVariables) {                                    
                    step = uriVariables['step'];                                
                }                                                               
            }
			let value = step;                                            
            thing.properties[NAME_PROPERTY_STATUS].write(value);                 
        });                                                                     
    });
thing.addAction(                                                                
    NAME_ACTION_,                                                      
    {
		description: "Turn off or on the system",
		uriVariables: {
			step: {
				"type": "string", 
				"enum": ["On","Off","idle/ProductionComplte", 
							"ProductionInProgress", "Error"]
			}
		}
	},                                                                         
    (data, options) => {                                                                     
		console.log(options);                                            
        return thing.properties[NAME_PROPERTY_STATUS].read().then(() => {  
			let step = "Off";                                                       
            if(options && 'uriVariables' in options) {                          
                let uriVariables = options['uriVariables'];                     
                if('step' in uriVariables) {                                    
                    step = uriVariables['step'];                                
                }                                                               
            }
			let value = step;                                            
            thing.properties[NAME_PROPERTY_STATUS].write(value);                 
        });                                                                     
    });
                                                                                
thing.expose().then( () => { console.info(thing.title + " ready"); } );               
