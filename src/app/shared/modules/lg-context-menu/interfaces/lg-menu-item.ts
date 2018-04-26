import { Observable } from 'rxjs/Observable';

export interface LgMenuItem {
    name: string;
    icon: string;
    action: Function;
    subMenu?: LgMenuItem[];
    disabled?: {
        (item: any): boolean | Observable<boolean>;
    } | boolean;
    hidden?: {
        (item: any): boolean | Observable<boolean>;
    } | boolean;
}

