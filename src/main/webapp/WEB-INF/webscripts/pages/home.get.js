"use strict";
/* global model */

model.jsonModel = {
   services: [
      {
        name: "alfresco/services/LoggingService",
        config: {
          loggingPreferences: {
            enabled: true,
            all: true
          }
        }
      },
      "alfresco/services/NavigationService",
      "alfresco/services/LogoutService",
      "alfresco/services/UserService"
      // Add more services here !!!
   ],
   widgets: [
      {
         id: "MAIN_VERTICAL_LAYOUT",
         name: "alfresco/layout/VerticalWidgets",
         config: 
         {
            widgets: [
               {
                  id: "HEADER_BAR",
                  name: "alfresco/header/Header",
                  config: {
                     widgets: [
                        {
                           id: "APP_MENU_BAR",
                           name: "alfresco/header/AlfMenuBar",
                           align: "left",
                           config: {
                              widgets: [
                                 {
                                    id: "HOME",
                                    name: "alfresco/menus/AlfMenuBarItem",
                                    config: {
                                       label: "Home",
                                       targetUrl: "ap/ws/home"
                                    }
                                 }
                              ]
                           }
                        },
                        {
                           id: "USER_MENU_BAR",
                           name: "alfresco/header/AlfMenuBar",
                           align: "right",
                           config: {
                              widgets: [
                                 {
                                    id: "USER_MENU",
                                    name: "alfresco/header/AlfMenuBarPopup",
                                    config: {
                                       label: "User Menu",
                                       widgets: [
                                          {
                                             id: "HEADER_USER_MENU",
                                             name: "alfresco/menus/AlfMenuGroup",
                                             config: {
                                                widgets: [
                                                   {
                                                      id: "LOGOUT",
                                                      name: "alfresco/header/AlfMenuItem",
                                                      config:
                                                      {
                                                         label: "Logout",
                                                         iconClass: "alf-user-logout-icon",
                                                         publishTopic: "ALF_DOLOGOUT"
                                                      }
                                                   }
                                                ]
                                             }
                                          }
                                       ]
                                    }
                                 }
                              ]
                           }
                        }
                     ]
                  }
               },
               {
                  id: "HEADER_TITLE_BAR",
                  name: "alfresco/layout/LeftAndRight",
                  className: "share-header-title",
                  config:
                  {
                     semanticWrapper: "header",
                     widgets:
                     [
                        {
                           id: "HEADER_LOGO",
                           name: "alfresco/logo/Logo",
                           align: "left",
                           config:
                           {
                              logoClasses: "alfresco-logo-only"
                           }
                        },
                        {
                           id: "HEADER_TITLE",
                           name: "alfresco/header/Title",
                           align: "left",
                           config: {
                              label: "People",
                              setBrowserTitle: "Home"
                           }
                        }
                     ]
                  }
               },
               {
                 name: "alfresco/lists/Paginator",
                 config: {
                  documentsPerPage: 10,
                   pageSizes: [5,10,20],
                   widgetsAfter: [
                     {
                       name: "alfresco/lists/SortFieldSelect",
                       config: {
                         sortFieldOptions: [
                           { label: "Display Name", value: "fullName", selected: true },
                           { label: "User Name", value: "userName" }
                         ]
                       }
                     },
                     {
                       name: "alfresco/lists/SortOrderToggle"
                     }
                   ]
                 }
               },
               {
                  name: "alfresco/lists/AlfFilteredList",
                  config: {
                     useHash: true,
                     loadDataPublishTopic: "ALF_GET_USERS",
                     filteringTopics: ["_valueChangeOf_FILTER"],
                     widgetsForFilters: [{
                       name: "alfresco/forms/controls/TextBox",
                       config: {
                         fieldId: "FILTER",
                         name: "filter",
                         placeHolder: "Enter filter text...",
                         label: "Name"
                       }
                     }],
                     widgets: [
                        {
                           name: "alfresco/documentlibrary/views/AlfGalleryView",
                           config: {
                              enableHighlighting: true,
                              itemKeyProperty: "userName",
                              expandTopics: ["EXPAND"],
                              widgets: [
                                 {
                                   name: "alfresco/lists/views/layouts/CellContainer",
                                   config: {
                                     publishTopic: "EXPAND",
                                     publishPayloadType: "PROCESS",
                                     publishPayloadModifiers: ["processCurrentItemTokens", "setCurrentItem"],
                                     publishPayloadItemMixin: true,
                                     publishPayload: {
                                       widgets: [
                                         {
                                           name: "alfresco/layout/ClassicWindow",
                                           config: {
                                             title: "{displayName}",
                                             widgets: [
                                                {
                                                   name: "alfresco/layout/AlfTabContainer",
                                                   config: {
                                                      currentItem: "___AlfCurrentItem",
                                                      widgets: [
                                                         {
                                                            name: "alfresco/layout/VerticalWidgets",
                                                            title: "Info",
                                                            config: {
                                                               widgets: [
                                                                  {
                                                                    name: "alfresco/node/MetadataGroups",
                                                                    config: {
                                                                      groups: [
                                                                        {
                                                                          title: "Contact Information",
                                                                          widgets: [
                                                                            {
                                                                              label: "Email",
                                                                              name: "alfresco/renderers/Property",
                                                                              config: {
                                                                                propertyToRender: "email"
                                                                              }
                                                                            },
                                                                            {
                                                                              label: "Telephone",
                                                                              name: "alfresco/renderers/Property",
                                                                              config: {
                                                                                propertyToRender: "telephone"
                                                                              }
                                                                            }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  }
                                                               ]
                                                            }
                                                         },
                                                         {
                                                            name: "alfresco/layout/VerticalWidgets",
                                                            title: "Sites",
                                                            config: {

                                                            }
                                                         },
                                                         {
                                                            name: "alfresco/layout/VerticalWidgets",
                                                            title: "Content",
                                                            config: {

                                                            }
                                                         }

                                                      ]
                                                   }
                                                }
                                             ]
                                           }
                                         }
                                       ]
                                     },
                                     widgets: [
                                       {
                                          name: "alfresco/renderers/AvatarThumbnail"
                                       },
                                       {
                                         name: "alfresco/renderers/Property",
                                         config: {
                                           propertyToRender: "displayName"
                                         }
                                       }
                                     ]
                                   }
                                 }
                              ]
                           }
                        }
                     ]
                  }
               },

               {
                  name: "alfresco/logging/DebugLog"
               }
               // Add more widgets here !!!
            ]
         }
      }
   ]
};