import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DirectiveComponent } from './components/directive/directive.component';
import { AttributeDirectiveComponent } from './components/attribute-directive/attribute-directive.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ForComponent } from './components/control-flow/for/for.component';
import { IfelseComponent } from './components/control-flow/ifelse/ifelse.component';
import { SwitchComponent } from './components/control-flow/switch/switch.component';
import { TemplateFormComponent } from './components/forms/template-form/template-form.component';
import { ReactiveFormComponent } from './components/forms/reactive-form/reactive-form.component';
import { IntegrationComponent } from './components/integration/integration.component';
import { FormArrayComponent } from './components/forms/form-array/form-array.component';
import { FormArrayNewComponent } from './components/forms/form-array-new/form-array-new.component';

export const routes: Routes = [
    {
        path:'add-emp',
        component: AddEmployeeComponent
    },
    {
        path:'emp-list',
        component: EmployeeListComponent
    },
    {
        path:'structural-dir',
        component: DirectiveComponent
    },
    {
        path:'attribute-dir',
        component: AttributeDirectiveComponent
    },
    {
        path:'data-binding',
        component: DataBindingComponent
    },
    {
        path: 'for',
        component: ForComponent
    },
    {
        path:'if-else',
        component: IfelseComponent
    },
    {
        path: 'switch',
        component: SwitchComponent
    },
    {
        path:'template',
        component: TemplateFormComponent
    },
    {
        path: 'reactive',
        component: ReactiveFormComponent
    },
    {
        path:'get-employee',
        component: IntegrationComponent
    },
    {
        path:'formArray',
        component:FormArrayComponent
    },{
        path:'newFormArray',
        component:FormArrayNewComponent
    }
];
