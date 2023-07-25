# haddock-hw
Haddock homework assignment

### Backend app structure.
  - The app is written in modular way. Moreover, all modules use dependency injection from parent to the child. No child should directly include any other service.
  All dependency services, modules, etc should be instantiated when the module is being created and passed down to the childs.
  No child should directly access any module without parent being aware.
  - There is an explicit devition between Web and core modules. Web modules such as products-web and order-web are just used to expose a rest services.
    Whereas core modules such as Products and order are designed to keep the business logic of each domain and can be used in multiple web modules later on. Moreover,
    Each core module should deal with its own deticated data or even database. The business logic of a core module is being kept in usecases. In our example we have promotions usecase which works with promotions.
    In the future orders may have other business logic. A new usecases will be added with a specific business logic.

### Frontend app structure.
  - Written in modular way. SPA has a react router that combines all pages defined in app. Each page should has it's own router. A Page is a module. It can be configured to apply lazy loading later on.
    Each page has it's own components that are only used on that page. If a component is used in at least two pages it will move to src/components directory to be shared amonth the whole app.
    Components defined in src/components should be dummy to be able to reuse them easily. Whereas page components are smart.
  - Data flow. For this particular app I have decided not to include redux. And just use context with provider. To make the order data available in many different pages shoppingcart context has been
    Added and provided in root level of the app. To avoid refetching products everytime when navigating from page to page a context can be added to hold already fetched products and share among the pages.

### NOTES
- https://www.npmjs.com/package/create-react-app and https://www.npmjs.com/package/generator-express-no-stress-typescript were used to generate Frontend and Backend apps.

#### Answers to Questons:
 ##### Q1 - How much existing code would you have to modify to change the data source from a JSON file to a database?
      - Only repository file (backend/server/api/modules/product/repository.ts) will be changed to change the data source from json to database.
 ##### Q2 - 
      - Only backend/server/api/modules/order/use-case/promotions.json should be changed to change current promotion values
      - If we want to apply a new promotion with a specific order then we will only need to add a new promotion type in promotions.json
        as well as the business logic in promotion.srvice.ts file.

### TODOS
- Add Frontend tests.
