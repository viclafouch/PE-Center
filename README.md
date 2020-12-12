<br />
<div align="center">
  <img src="https://www.gstatic.com/alkali/apps/bento/images/characters.png" height="150px" />
</div>

# PE Center

PE Center is a web extension which allows users to search, access and copy the help articles of the official Google products (YouTube, Google Chrome, ...). This web extension also allows to retrieve the latest posts created on the official Google's forums.

- [PE Center on Firefox](https://addons.mozilla.org/fr/firefox/addon/pe-center/)
- [PE Center on Google Chrome](https://chrome.google.com/webstore/detail/pe-center/hanknpkmjbfhcalmipokkfplndkohgdm)

### What I use 🚀

- [ReactJS](https://github.com/facebook/react) - Framework JS.
- [PE Crawler](https://github.com/viclafouch/PE-crawler) - API.
- [Material UI](https://material-ui.com) - React components.
- [Styled-components](https://github.com/styled-components/styled-components) - CSS in JS.
- [React-i18next](https://github.com/i18next/react-i18next) - Internationalization for React.

### Installing from source 🧰

1. Clone the repository: `git clone https://github.com/viclafouch/PE-Center.git`
2. Install the npm dependencies `npm install`
3. Build the inject script: `npm run build`

Only on **Mozilla Firefox** :

4. Navigate to `about:debugging#/runtime/this-firefox`
5. Choose "Load Temporary Add-on..."
6. In the dialog, open the file `build/firefox/manifest.json`

Only on **Google Chrome** :

4. Navigate to `chrome://extensions` and enable Developer Mode.
5. Choose "Load unpacked extension"
6. In the dialog, open the directory `build/chrome`

## Made with ❤️ for PE

<img src="https://gstatic.com/alkali/apps/bento/images/product_experts_logo_text_v2.png" width="150px" />

_"Save the day, one answer at a time"_
