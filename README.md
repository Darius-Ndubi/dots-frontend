# Dots

Dots is a modern visualization and reporting tool to help nonprofits connect their data from multiple sources to visualize and make results reporting easier.

## Getting Started

Here are the steps to get the application up and running on your local machine for development and testing.

Steps are provided using `yarn` but `npm` can also be used if preferred. The setup can done with `docker` as well.

### Project setup without docker

Start with updating all the package dependencies by running install.

```
yarn install
```

#### Compiles and hot-reloads for development

Compile and load the app by running the following:

```
yarn serve
```

#### View the application

View the application on any browser at the following:

`0.0.0.0:8080`

### Project setup with docker

##### Ensure you have _docker_ and _docker-compose_ installed

To build the image run the following:

```
docker-compose build
```

After the image is successfully build you can start dev env with:

```
docker-compose up
```

Open your favorite browser and navigate to:

```
0.0.0.0:8080
```

## Build and testing

#### Compiles and minifies for production

To compile the app for production the following `build` command can be run:

```
yarn build
```

#### Run unit tests

```
yarn test:unit
```

#### Lints and fixes files

```
yarn lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Built With

- [Vue.js](https://vuejs.org/) - Framework used
- [ElementUI](https://element.eleme.io/) - UI components library used
- [Travis CI](https://travis-ci.org/) - CI service for deployment
- [Kubernetes](https://kubernetes.io/) - Automated deployment

## Versioning

For versions available, see the tags on this repository.

## Coding convention

### Naming

- Filenames of single-file components should be PascalCase for example use `UserProfile.vue`.
- Component names should always be multi-word, except for root `App.vue` or `index.vue`components. Use “UserProfile” instead of “Profile” for example.
- Each component should be in its own file.
- Child components should include their parent name as a prefix. For example if you would like a “Photo” component used in the “UserProfile” you will name it “UserProfilePhoto”. It’s for better readability since files in a folder are usually ordered alphabetically.
- Always use full name instead of abbreviation in the name of the components. For example don’t use “WSSettings”, use instead “WorkspaceSettings”.

Reference: [Vue Style Guide](https://vuejs.org/v2/style-guide/)

### Styling

- `Grid` layout style is used for page layout and `flex` layout is used for specific element styling.
- Hikaya's UI components library `hakawati` is used as the app's main components.
- `SCSS` is used as the styling language.

### Internationalization
- Dots app is built to support multiple languages. Any labels in the app are to be added as language variables instead of hard coding them.

### Configurations
- Vue configuration is updated so that all the variables and classes from the library can be accessed in all components without the need to import anything.
- When any new route is added, make sure to inherit conditions from `Main.vue` and `auth` file.

### Testing
- Unit test should be added for each component.
- Currently `Vue test utils` and `Jest` are used for writing tests.

[Reference](https://vuejs.org/v2/cookbook/unit-testing-vue-components.html)

### Vuex conventions
- Module: Module name should be short, quite clear about it’s destination, and have words separated by a dash where required.
- State: States are written in underscore_case notation and indicate what they contain
- Getter: Getter should start with `is` when returning a Boolean, or otherwise `get`. It should also answer the question `what am I returning?`
- Action: Actions should be as unique as possible and simply describe what specific action will happen.

[Reference](https://docs.vuestorefront.io/guide/vuex/vuex-conventions.html)