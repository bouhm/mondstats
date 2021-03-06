## 0.1.4-beta

- Optimize assets and caching
- Add animations
- Regarding data updates for new content:
  - I am still searching for a solution that is not intrusive. At this time it is still not possible to gather enough data for new content with the 8 character restriction and loss of Spiral Abyss team data.

## 0.1.3-beta

- Consolidate all UI theme colors
- Fix UI scaling and spacing for mobile

## 0.1.2-beta

- UI tweaks/fixes
- Added more tooltips

## 0.1.1-beta

- Improved loading / rendering cycle
- Changed website theme

## 0.1.0-beta

- Changed Spiral Abyss teams to show uncombined core team stats
- Fixed weapon/artifact pages not showing overall usage
- Added stats table ordering

## dev preview 12.27.21

- Added URL query params for persistent state management

## dev preview 12.26.21

- Adjusted character overall usage statistics to be relative to total players instead of characters
- Fixed UI scaling issues

## dev preview 12.24.21

- More UI changes for better scaling for mobile
- Abyss battles are now split up by stages, battles displayed together

## dev preview 12.24.21

- Component refactoring for consistency across character/artifact/weapon pages
- Artifact set selector UI changed to vertical for better mobile/desktop experience
- Fixed issues with character page responsiveness
- Removed stacking of sticky tabs/headers/searchbar, added jump-to-top button on the bottom right

## dev preview 12.22.21

- Migrated to a new database schema and reworked all of the data aggregation
- Improved abyss team flex UI
- Added abyss statistics to builds, weapons, and artifact sets
- Added individual pages for every weapon and artifact set

## dev preview 10.10.21

- Spending a lot of time on the backend for the following changes:
  - Revamping weapons/artifact set data to show more statistics -- new data aggregation
  - Working on optimizing and performing data aggregation on the cloud instead of the client

\*I'm currently reworking my whole database. During this period changes to the live site will be halted. Thank you for your patience.

## dev preview 9.29.21

- Adjusted abyss team aggregation algorithm to include more teams and show more logical flex options

## dev preview 9.17.21

- Improved abyss team aggregation to show multiple flex options
- Decreased abyss stage clear threshold from 3-stars to 1-star. Additional filtering options WIP
- Improved team search such that searching for teams by character will always show some results

## dev preview 9.7.21

- Added additional filtering options including Lvl 90+ character builds

## dev preview 8.29.21

- NEW Abyss teams now show "flex" characters
  - This is aggregated by a "core" team, determined by the most used trio from a party of 4. Then the 4th character represents the flex character (the variable character in the team), ordered from most to least used.

## dev preview 8.25.21

- Favonius.io is now Mondstats!

## dev preview 8.22.21

- Fix Abyss data aggregation and filtering, show halves for every floor

## dev preview 8.21.21

- Add character statistics page
- Lots of QoL features such as pagination to reduce excessive vertical scrolling
- Optimize image lazy loading

## dev preview 8.16.21

- Switch to GH pages static json API to avoid GH API rate limit (slower to load)

## dev preview 8.12.21

- Make percentages accurate to the tenth
- Update tooltips

## dev preview 8.09.21

- Utilize horizontal scrolling where appropriate instead of vertical lists
- New pages for artifact set/weapon usage statistics (WIP)

## dev preview 8.01.21

- Aggregate data updates are now daily (because why wait a week)
- Data more than 6 weeks old (one patch cycle) is purged at the start of every patch

## dev preview 7.31.21

- Fix bug in character build page where parties of 5 would appear
- Change to a font that is more legible in smaller size
- Increase shown weapons/artifact builds from 8 to 10

## dev preview 7.29.21

- Update data collection to auto-update weekly
- Purge data more than 6 weeks old

## dev preview 7.27.21

- Fetch data from Mondstats API instead of local
- Break up data to fetch only relevant parts
- Add minimal loaders accordingly

## dev preview 7.21.21

- Add F2P filtering by maximum number of 5-stars
- Update for 2.0

## dev preview 7.19.21

- Lots of UI changes to be more mobile friendly including:
- Change character select components to dropdown
- Responsive team containers instead of grids
- Move data counts to tooltips for charts
- More collapsible menu/popups

## dev preview 7.17.21

- Build spiral abyss page, replace spiral abyss data in character builds with top teams

## dev preview 7.08.21

- Use menu for artifact set selection
- More aggregation for weapons, artifact sets, and spiral abyss data
- At this point just assume every update = more data

## dev preview 7.02.21

- Update assets and convert images to slightly more optimized WebP
- Style fixes with some controls UI components
- Update for newer content, increase data pool to ~13000 players total

## dev preview 6.30.21

- Add F2P filtering for character builds
- Add Constellation stats
- Add preliminary Kaedahara Kazuha data

## dev preview 6.28.21

- Fix aggregation on abyss battles
- Update data pool to ~11000 players total

## dev preview 6.26.21

- Implement more filtering including filter by F2P in the backend

## dev preview 6.15.21

- Add character constellations and average levels
- Update API aggregation functions

## dev preview 6.10.21

- Built out an actual backend API server
- Add more granular filters

## dev preview 6.02.21

- Migrate to an actual database
- Update current data to have more up-to-date builds and stats

## dev preview 5.27.21

- Updated About page & Changelog
- Moved "Pls" to About page
- Update domain name

## dev preview 5.25.21

- Added filtering by mains (lvl 90 characters) and characters who cleared the Spiral Abyss (clear 12-3 with at least 34 stars total)
- Spiral Abyss teams now show most commonly used teams. Data only includes teams that cleared the stage with 3 stars.
- Fixed separation of Anemo & Geo MC pages
- Updated total data to include Eula
- Optimize static assets

## dev preview 5.17.21

- Made pages more responsive for mobile screens and ultrawide screens
- Tweak bar charts to take less space on the page
- Added tooltips to pie charts and bar charts
- Updated total data sample-size to 1994, include newer builds

## dev preview 5.13.21

- Change build statics to show usage as combination of weapon and artifact set instead of relative to all weapons/artifacts
- Added character usage statistics in Spiral Abyss
- Added most common pairing of characters in Spiral Abyss

## dev preview 5.07.21

- Update data
- Fix build selection UI
- Fix UI scaling and page responsiveness
