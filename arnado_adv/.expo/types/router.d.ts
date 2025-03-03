/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/CRUD/components/UserInfo`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(information)'}/about` | `/about`; params?: Router.UnknownInputParams; } | { pathname: `${'/(information)'}/contact` | `/contact`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/exercises` | `/exercises`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/CRUD`; params?: Router.UnknownInputParams; } | { pathname: `/CRUD/useContext`; params?: Router.UnknownInputParams; } | { pathname: `/CRUD/useReducer`; params?: Router.UnknownInputParams; } | { pathname: `/hooks/effects`; params?: Router.UnknownInputParams; } | { pathname: `/hooks`; params?: Router.UnknownInputParams; } | { pathname: `/hooks/state`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/quiz`; params?: Router.UnknownInputParams; } | { pathname: `/register`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/settings/Test1`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/CRUD/components/UserInfo`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(information)'}/about` | `/about`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(information)'}/contact` | `/contact`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/exercises` | `/exercises`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/CRUD`; params?: Router.UnknownOutputParams; } | { pathname: `/CRUD/useContext`; params?: Router.UnknownOutputParams; } | { pathname: `/CRUD/useReducer`; params?: Router.UnknownOutputParams; } | { pathname: `/hooks/effects`; params?: Router.UnknownOutputParams; } | { pathname: `/hooks`; params?: Router.UnknownOutputParams; } | { pathname: `/hooks/state`; params?: Router.UnknownOutputParams; } | { pathname: `/login`; params?: Router.UnknownOutputParams; } | { pathname: `/quiz`; params?: Router.UnknownOutputParams; } | { pathname: `/register`; params?: Router.UnknownOutputParams; } | { pathname: `/settings`; params?: Router.UnknownOutputParams; } | { pathname: `/settings/Test1`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/CRUD/components/UserInfo${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(information)'}/about${`?${string}` | `#${string}` | ''}` | `/about${`?${string}` | `#${string}` | ''}` | `${'/(information)'}/contact${`?${string}` | `#${string}` | ''}` | `/contact${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/exercises${`?${string}` | `#${string}` | ''}` | `/exercises${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/CRUD${`?${string}` | `#${string}` | ''}` | `/CRUD/useContext${`?${string}` | `#${string}` | ''}` | `/CRUD/useReducer${`?${string}` | `#${string}` | ''}` | `/hooks/effects${`?${string}` | `#${string}` | ''}` | `/hooks${`?${string}` | `#${string}` | ''}` | `/hooks/state${`?${string}` | `#${string}` | ''}` | `/login${`?${string}` | `#${string}` | ''}` | `/quiz${`?${string}` | `#${string}` | ''}` | `/register${`?${string}` | `#${string}` | ''}` | `/settings${`?${string}` | `#${string}` | ''}` | `/settings/Test1${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/CRUD/components/UserInfo`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(information)'}/about` | `/about`; params?: Router.UnknownInputParams; } | { pathname: `${'/(information)'}/contact` | `/contact`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/exercises` | `/exercises`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/CRUD`; params?: Router.UnknownInputParams; } | { pathname: `/CRUD/useContext`; params?: Router.UnknownInputParams; } | { pathname: `/CRUD/useReducer`; params?: Router.UnknownInputParams; } | { pathname: `/hooks/effects`; params?: Router.UnknownInputParams; } | { pathname: `/hooks`; params?: Router.UnknownInputParams; } | { pathname: `/hooks/state`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/quiz`; params?: Router.UnknownInputParams; } | { pathname: `/register`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/settings/Test1`; params?: Router.UnknownInputParams; };
    }
  }
}
