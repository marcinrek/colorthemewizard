# Color Theme Wizard

## Description

Small React widget that enables you to edit CSS color variables used on the page. Nothing you can't do using dev tools ... but:
* it enables you to save your changes to local storage and then load on a different page which can be useful for testing multipage sites
* it generates new CSS on the fly that you can just ctrl+c, ctrl-v to you stylesheet
* it is easier to use by a non-technical people 

## Usage

```html
<link rel="stylesheet" href="path/to/render.css" />
<script src="path/to/render.jsx"></script>

<div id="ctw"></div>

<script>
    window.renderCTW({
        appWrapperId: 'ctw',
        selectors: [
            ':root, ::after, ::before',
            '.test, .test ::before, .test ::after'
        ],
        selectorFilters: {
            remove: /^--(tw).+/g,
            keep:  /^.+/g
        },
        hightlight: [
            '--primary'
        ]
    })
</script> 
```

## Properties
* appWrapperId - id to load the app to
* selectors - array of css selector to get the css variables from
* selectorFilters
    * remove - regEx of variables to remove
    * keep - regEx of variables to keep
* hightlight - array of variables to put on the top of the list

## Donate 
If you find this piece of code to be useful, please consider a donation :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate?hosted_button_id=ZPSPDRNU99V4Y)

