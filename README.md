# StarWars

# Pour lancer le projet il est impératif d'utiliser "npm start" au lieux de "ng serve" !

Lien vers le localhost utilisé : http://localhost:4200/accueil
Lien d'utiisation de l'API : https://swapi.dev/api

# Conception à suivre (notes personnelles)
## DATAs :
 [DONE] Personnages.
 [DONE] Planètes.
 [DONE] Véhicules.
 [DONE] Vaisseaux (spatiaux).
 [DONE] Films.
 [DONE] Espèces.

## Header :
Le header devrait avoirs les sections suivantes :
 [DONE] Accueil.
 [DONE] Personnages.
 [DONE] Planètes.
 [DONE] Vaisseaux.
 [DONE] À propos.
 [DONE] L'image du footer doit changer pour s'adapter à la section actuelle.

## Footer :
Le footer doit contenir les informations footer :
 [DONE] Auteur.
 [DONE] Email ?
 [DONE] API utilisée.
 [DONE] RouterLink vers la page À propos.
 [DONE] Les addons utilisés (Bootstrap).

## Contenu de la BarNav :
Les onglets doivent afficher les objets suivant quatres objets par lignes.
[DONE] Personnages
[DONE] Planètes
[DONE] Vaisseaux
[DONE] Véhicules
[DONE] Espèces
[DONE] Films

Les onglets doivent avoir un système de paginations.
[DONE] Personnages
[DONE] Planètes
[DONE] Vaisseaux
[DONE] Véhicules
[DONE] Espèces
[DONE] Films

[Bonus|DONE] Les onglets affichent plus de 10 articles par page.

## À Propos :
La page "À propos" doit contenir :
[DONE] Nom & Prénom.
[DONE] ISEN 4 etc.

## Pour la navigation & détails :
[DONE] La page de rerche doit posséder une recherche par nom.
[Bonus|ABANDONED] La page de recherche peut posséder une recherche avancée (monde natal par personnage / monde de création de Starship)

Les résultats de recherches doivent être disposés en grille, chaque case devrait avoir :
 [DONE] Le nom.
 [CANNOT_DO] L'image si possible.
 [AVOIDED] Un bouton "Plus de détails".
 [Bonus|DONE] Cliquer sur la case (et non plus le bouton) ouvrirait les détails.

Contexte :
Au début je pensais faire un affichage à l'écran des premiers éléments reçus. Puis à l'instar de la rubrique Image de Edge, je pensais faire un bouton "Plus de [Nom_catégorie_actuelle]".
Pour cela j'avais imaginé un système de liste-BDD qui stockerait toutes les données déjà reçues acompagnée d'une seconde liste qui s'occuperait de recevoir les nouvelles données quand on clique sur le bouton "Plus de [Nomblablabla]" pour ensuite ajouter ces nouvelles données à la première liste.
Je pense cependant me rabatre sur un système de sélection de page : [1][2][3][4][5]

# ======================== FIN DES NOTES PERSONNELLES ========================
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
#   S t a r W a r s 
 
 