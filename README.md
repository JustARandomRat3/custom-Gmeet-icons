### Custom Meet Icons (firefox ext)
- Show a placeholder image when no custom icon is set
- Keep user icons visually consistent
- [Add other features here]

## Installation

### From a packaged release

1. Download the extension package from [Releases](RELEASES_URL).
2. In Firefox, open `about:addons`.
3. Select the gear icon and choose **Install Add-on From File…**
4. Select the downloaded `.zip` file.

### Temporary installation for development

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Select **Load Temporary Add-on…**
3. Choose the extension’s `manifest.json` file.

## Usage

1. Install and enable the extension.
2. Open the extension’s settings or the supported page.
3. Add or select a user’s custom icon.
4. If no custom icon is set, the extension displays its placeholder image.

## Placeholder image

The placeholder image is used when a user has no custom icon or their custom image can’t be loaded.

To replace it, update the placeholder asset at:

```text
[PATH\_TO\_PLACEHOLDER\_IMAGE]
