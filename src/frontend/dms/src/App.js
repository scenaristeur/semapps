import React from 'react';
import { Admin, Resource } from 'react-admin';
import { dataProvider, authProvider, httpClient } from '@semapps/react-admin';
import LogoutButton from './auth/LogoutButton';
import { ProjectList, ProjectEdit, ProjectCreate, ProjectIcon } from './resources/projects';
import { OrganizationList, OrganizationEdit, OrganizationCreate, OrganizationIcon } from './resources/organizations';
import { PersonList, PersonIcon } from './resources/persons';
import { ConceptList, ConceptIcon } from './resources/concepts';
import resources from './config/resources';
import ontologies from './config/ontologies';

function App() {
  return (
    <Admin
      dataProvider={dataProvider({
        sparqlEndpoint: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
        httpClient,
        resources,
        ontologies
      })}
      authProvider={authProvider(process.env.REACT_APP_MIDDLEWARE_URL)}
      logoutButton={LogoutButton}
    >
      <Resource
        name="Project"
        list={ProjectList}
        edit={ProjectEdit}
        create={ProjectCreate}
        icon={ProjectIcon}
        options={{ label: 'Projets' }}
      />
      <Resource
        name="Organization"
        list={OrganizationList}
        edit={OrganizationEdit}
        create={OrganizationCreate}
        icon={OrganizationIcon}
        options={{ label: 'Organisations' }}
      />
      <Resource name="Person" list={PersonList} icon={PersonIcon} options={{ label: 'Contributeurs' }} />
      <Resource name="Concept" list={ConceptList} icon={ConceptIcon} options={{ label: 'Concepts' }} />
      <Resource name="Agent" />
    </Admin>
  );
}

export default App;
