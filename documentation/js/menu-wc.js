'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mobabuild documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' : 'data-bs-target="#xs-components-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' :
                                            'id="xs-components-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' }>
                                            <li class="link">
                                                <a href="components/AddChampionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddChampionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddObjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddRuneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddRuneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddSpellComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddSpellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteChampionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteChampionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteObjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteRuneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteRuneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteSpellComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteSpellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditChampionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditChampionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditObjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditObjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditRuneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditRuneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditSpellComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditSpellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListChampionPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListChampionPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListObjectPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListObjectPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListRunePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListRunePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListSpellPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListSpellPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListUserPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListUserPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' : 'data-bs-target="#xs-pipes-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' :
                                            'id="xs-pipes-links-module-AdminModule-4faac05c5aa2dd4b8dba6c8e310283cbd85964f0cbc31d6b68ba32d2b88a574aca14e525a8d9468c0243b678a55d379f00b76a9c1cfe1bc1aa48282356d3bc2c"' }>
                                            <li class="link">
                                                <a href="pipes/Base64ToImagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Base64ToImagePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-b1ea33d32cdd84550929a2005c14bb9b667a291c7366142520d31a642d90ad1441db306f5d818f598b7318deceaaae638d8788a9cb176883bc0812c9bdcfcdb4"' : 'data-bs-target="#xs-components-links-module-AppModule-b1ea33d32cdd84550929a2005c14bb9b667a291c7366142520d31a642d90ad1441db306f5d818f598b7318deceaaae638d8788a9cb176883bc0812c9bdcfcdb4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b1ea33d32cdd84550929a2005c14bb9b667a291c7366142520d31a642d90ad1441db306f5d818f598b7318deceaaae638d8788a9cb176883bc0812c9bdcfcdb4"' :
                                            'id="xs-components-links-module-AppModule-b1ea33d32cdd84550929a2005c14bb9b667a291c7366142520d31a642d90ad1441db306f5d818f598b7318deceaaae638d8788a9cb176883bc0812c9bdcfcdb4"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-0a2cc35f4d5afe9ecedb5412303f191f578d7696e1f4f65dab8c8e9fe660b259989f2aed2c049cd203dddb2d7c4c31d78380d89483d7eea6d308811b22350a57"' : 'data-bs-target="#xs-components-links-module-AuthModule-0a2cc35f4d5afe9ecedb5412303f191f578d7696e1f4f65dab8c8e9fe660b259989f2aed2c049cd203dddb2d7c4c31d78380d89483d7eea6d308811b22350a57"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-0a2cc35f4d5afe9ecedb5412303f191f578d7696e1f4f65dab8c8e9fe660b259989f2aed2c049cd203dddb2d7c4c31d78380d89483d7eea6d308811b22350a57"' :
                                            'id="xs-components-links-module-AuthModule-0a2cc35f4d5afe9ecedb5412303f191f578d7696e1f4f65dab8c8e9fe660b259989f2aed2c049cd203dddb2d7c4c31d78380d89483d7eea6d308811b22350a57"' }>
                                            <li class="link">
                                                <a href="components/LoginPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MobabuildModule.html" data-type="entity-link" >MobabuildModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' : 'data-bs-target="#xs-components-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' :
                                            'id="xs-components-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' }>
                                            <li class="link">
                                                <a href="components/AddBuildPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddBuildPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteBuildComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteBuildComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBuildComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditBuildComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavBuildPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavBuildPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBuildCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchBuildCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBuildComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchBuildComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserBuildPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserBuildPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewBuildPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewBuildPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' : 'data-bs-target="#xs-pipes-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' :
                                            'id="xs-pipes-links-module-MobabuildModule-657c64ea88fd2d5fe00dffbb2e7d7ec73eef564986fbfb3c47aa161b22c7f622f7bd15bc30e8ad8eeea324b728d3cd7a6c6de2e57925596b40f1b21330180e45"' }>
                                            <li class="link">
                                                <a href="pipes/Base64ToImagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Base64ToImagePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MobabuildRoutingModule.html" data-type="entity-link" >MobabuildRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' : 'data-bs-target="#xs-components-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' :
                                            'id="xs-components-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' }>
                                            <li class="link">
                                                <a href="components/Error404PageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Error404PageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' :
                                            'id="xs-pipes-links-module-SharedModule-42eb21c055510d0e6f667b6fe1e233068fc2398480194c56f23b74e6a4ba443b1c8dca07346f7caec4854a8d62dd828df8de6fd2acb283dd3727b315bd254096"' }>
                                            <li class="link">
                                                <a href="pipes/Base64ToImagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Base64ToImagePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedRoutingModule.html" data-type="entity-link" >SharedRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/HomePageComponent-1.html" data-type="entity-link" >HomePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePageComponent-2.html" data-type="entity-link" >HomePageComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthorityService.html" data-type="entity-link" >AuthorityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BuildService.html" data-type="entity-link" >BuildService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChampionService.html" data-type="entity-link" >ChampionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChampionService-1.html" data-type="entity-link" >ChampionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObjectService.html" data-type="entity-link" >ObjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObjectService-1.html" data-type="entity-link" >ObjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RuneService.html" data-type="entity-link" >RuneService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RuneService-1.html" data-type="entity-link" >RuneService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link" >SharedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpellService.html" data-type="entity-link" >SpellService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpellService-1.html" data-type="entity-link" >SpellService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService-1.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService-2.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddUserRequest.html" data-type="entity-link" >AddUserRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiResponse.html" data-type="entity-link" >ApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Authority.html" data-type="entity-link" >Authority</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Build.html" data-type="entity-link" >Build</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Champions.html" data-type="entity-link" >Champions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FavoriteBuild.html" data-type="entity-link" >FavoriteBuild</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectD.html" data-type="entity-link" >ObjectD</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectSet.html" data-type="entity-link" >ObjectSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permises.html" data-type="entity-link" >Permises</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rune.html" data-type="entity-link" >Rune</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RuneSet.html" data-type="entity-link" >RuneSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Spell.html" data-type="entity-link" >Spell</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpellSet.html" data-type="entity-link" >SpellSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserComand.html" data-type="entity-link" >UserComand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserLogin.html" data-type="entity-link" >UserLogin</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/Base64ToImagePipe-1.html" data-type="entity-link" >Base64ToImagePipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/Base64ToImagePipe-2.html" data-type="entity-link" >Base64ToImagePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});