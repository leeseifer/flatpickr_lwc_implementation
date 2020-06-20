import {LightningElement,wire,track} from 'lwc';
import flatpick from '@salesforce/resourceUrl/flatpick';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
var flatpickdp ={};
export default class DatePicker extends LightningElement {
    
    datepickerInitialized = false;
    renderedCallback(){
        if(this.datepickerInitialized){
            return;
        }
        this.datepickerInitialized = true;

        Promise.all([
            loadScript(this, flatpick + '/flatpickr.js'),
            loadStyle(this,flatpick + '/material_blue.min.css')
        ]).then(() => {
            this.intializeDatepicker();
        })
        .catch(error => {
            console.log({message: 'Error onloading',error});
        });
    } 
    intializeDatepicker(){
        const dpDiv = this.template.querySelector('div.flatpickr');
        flatpickdp =  flatpickr(dpDiv,{
            inline:true,
            minDate: "today",
            appendTo:dpDiv
        });
    }

    handleChangeDate(evt){
        evt.preventDefault();
        const sDate = {
            dateString : evt.target.value,
            dateJs : flatpickdp.selectedDates[0]
        };
        evt.preventDefault();
        const changeDate = new CustomEvent('datechanged',{detail:sDate});
        this.dispatchEvent(changeDate);
    }
}