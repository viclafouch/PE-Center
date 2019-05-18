<br />
<div align="center">
  <a href="https://www.styled-components.com">
    <img alt="styled-components" src="https://www.gstatic.com/alkali/apps/bento/images/characters.png" height="150px" />
  </a>
</div>

# PE Center (v3.0.0)

PE Center is an extension which allows users to search, access and copy the help articles of the official Google products (YouTube, Google Chrome, ...). This web extension also allows to retrieve the latest posts created on the official Google's forums.

- [PE Center on Firefox](https://chrome.google.com/webstore/detail/tc-center/hanknpkmjbfhcalmipokkfplndkohgdm?authuser=1)
- [PE Center on Google Chrome](https://chrome.google.com/webstore/detail/tc-center/hanknpkmjbfhcalmipokkfplndkohgdm?authuser=1)

[![PE VIDEO](https://github.com/viclafouch/PE-Center/blob/master/screenshot-video.png)](https://www.youtube.com/watch?v=BDYCFtLuT1M)

#### Langs supported :
- Français
- English
- Deutsch
- Português (Brasil)
- Español

#### Products supported :
- YouTube
- Google Search
- Google Photos
- Google AdSense
- Google Maps
- Gmail
- Google Chrome

### What I use:

- [ReactJS](https://github.com/facebook/react) - Framework JS.
- [Google Support Crawler](https://github.com/viclafouch/google-support-crawler) Unofficial API of Google Products
- [Styled-components](https://github.com/styled-components/styled-components) - CSS in JS.
- [React-i18next](https://github.com/i18next/react-i18next) - Internationalization for React.

At least but not last, this extension uses an API specially developed for this project, called [GSC (Google Support  Crawler)](https://github.com/viclafouch/google-support-crawler).

### Installing from source

1. Clone the repository: `git clone https://github.com/viclafouch/PE-Center.git`
2. Install the npm dependencies `npm install`
3. Build the inject script: `npm run build`

Only on **Mozilla Firefox** :

4. Navigate to `about:debugging`
5. Choose "Load Temporary Add-on..."
6. In the dialog, open the file `build/firefox/manifest.json`

Only on **Google Chrome** :

4. Navigate to `chrome://extensions` and enable Developer Mode.
5. Choose "Load unpacked extension"
6. In the dialog, open the directory `build/chrome`

## Made with ❤️ for PE

<img alt="styled-components" src="https://gstatic.com/alkali/apps/bento/images/product_experts_logo_text_v2.png" width="150px" />

_"Save the day, one answer at a time"_
