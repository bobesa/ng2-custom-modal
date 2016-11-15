Angular2 Customizable Modal
===========================

This project works currently as a simple dependency that allows you to create your own modal structure, display it on different place in dom and keep all template features and scope intact.

## Making it work...
There are few things you need to do to make this work. Follow the next few steps.

```bash
$ npm install ng2-custom-modal --save
```

### Imports to NgModule decorator
Following things needs to be put into `@NgModule` decorator.

```javascript
import { MODAL_DECLARATIONS, MODAL_PROVIDERS } from 'ng2-custom-modal';

@NgModule({
    declarations: [
        ...MODAL_DECLARATIONS
    ],
    providers: [
        ...MODAL_PROVIDERS
    ]
})
```

### Modal Content directives inside your app
In order to show all your modals in the same place in dom, create an element (`div` for example) and use `modalHolder` directive in it.
Just make sure you will use it only once in the whole app. There is currently no support for multiple places.

```html
<nav>
    ...
</nav>
<main>
    <router-outlet></router-outlet>
    <!-- This is just an ordinary frame around all of our modals -->
    <div style="border: 2px solid black; padding: 10px;">
        <modal-content></modal-content>
        <!-- This is where all our modal DOMs will be placed -->
    </div>
</main>
``` 

`<modal-content></modal-content>` works as an anchor to where all modals will be placed when displayed.

### Create the modal
Create your actual modal anywhere in any template on any place.

```html
<div *modal="let modalData from modalInstanceVariable">
    {{ modalData }}
</div>
```

Once `modalInstanceVariable` is set - modal is displayed next to `<modal-content></modal-content>` placement in our application dom.

## Cool tricks

There are additional tricks you can use to achieve even more modal freedom.

### Modal Holder Directive

If you want to just play with the state or get a reference to current modal anywhere in the app just use `modalHolder` directive.
This way you are able to create backdrops for your modals etc.
`modalHolder` directive will also provide you with `onShow`, `onClose` & `onBeforeClose` event emmiters.

```html
<div modalHolder
    (onShow)="backdropShown = true"
    (onClose)="backdropShown = false"
    [style.display="backdropShown ? 'block' : 'none'"]>
</div>
```

### Getting Modal instance from Modal Holder

`onShow`, `onClose` & `onBeforeClose` are available emmiters. All of them will report current **Modal instance** as `$event` variable.

```html
<div modalHolder
    (onShow)="currentModal = $event">
</div>
```

### Additional Modal Tricks

There are additional things you can get when using `*modal` sugar.

```html
<div *modal="let modalData from modalInstance; let modalThing = modal; let closeFunc = close">
    <!-- Implicit value from the instance when showing the modal is actual data of the modal -->
    <pre>{{ modalData }}</pre>
    
    <!-- You can as well get it right from the modal instance -->
    <pre>{{ modalThing.data | json }}</pre>

    <!-- You can use "let closeFunc = close" to get this modal's closing function -->
    <button (click)="closeFunc()">Close trough function</button>
    
    <!-- However you can do the same just calling "modalThing.close()" -->
    <button (click)="modalThing.close()">Close trough modal</button>
</div>
```

### Custom Modal Instances

We are using `Modal` classes internally. Even when you pass any value as modal, it will be transferred to `Modal` class with given value.
However you can build your own classes and modify behaviour of modals even more.

```javascript
import {Modal} from 'ng2-custom-modal';

class MyAmazingModal extends Modal {
    public myVariable: string = 'My Amazing String';

    constructor(data: any) {
        super(data);
    }
}
```

Then you will be able to reach `myVariable` like this

```html
<div *modal="let modalData from modalInstance; let modalThing = modal">
    {{ modalThing.myVariable }}
</div>
```
