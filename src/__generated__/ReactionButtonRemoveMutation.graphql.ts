/**
 * @generated SignedSource<<e7fc2c569434a83786a1a2d6204600cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ReactionContent = "CONFUSED" | "EYES" | "HEART" | "HOORAY" | "LAUGH" | "ROCKET" | "THUMBS_DOWN" | "THUMBS_UP" | "%future added value";
export type RemoveReactionInput = {
  clientMutationId?: string | null | undefined;
  content: ReactionContent;
  subjectId: string;
};
export type ReactionButtonRemoveMutation$variables = {
  input: RemoveReactionInput;
};
export type ReactionButtonRemoveMutation$data = {
  readonly removeReaction: {
    readonly reaction: {
      readonly content: ReactionContent;
    } | null | undefined;
    readonly subject: {
      readonly id: string;
      readonly reactionGroups?: ReadonlyArray<{
        readonly content: ReactionContent;
        readonly reactors: {
          readonly totalCount: number;
        };
        readonly viewerHasReacted: boolean;
      }> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ReactionButtonRemoveMutation = {
  response: ReactionButtonRemoveMutation$data;
  variables: ReactionButtonRemoveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ReactionGroup",
      "kind": "LinkedField",
      "name": "reactionGroups",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ReactorConnection",
          "kind": "LinkedField",
          "name": "reactors",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "viewerHasReacted",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReactionButtonRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveReactionPayload",
        "kind": "LinkedField",
        "name": "removeReaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Reaction",
            "kind": "LinkedField",
            "name": "reaction",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ReactionButtonRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveReactionPayload",
        "kind": "LinkedField",
        "name": "removeReaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Reaction",
            "kind": "LinkedField",
            "name": "reaction",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4f1a162762ae67ffe556acf94cb0938e",
    "id": null,
    "metadata": {},
    "name": "ReactionButtonRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation ReactionButtonRemoveMutation(\n  $input: RemoveReactionInput!\n) {\n  removeReaction(input: $input) {\n    reaction {\n      content\n      id\n    }\n    subject {\n      __typename\n      id\n      ... on Discussion {\n        reactionGroups {\n          content\n          reactors {\n            totalCount\n          }\n          viewerHasReacted\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d552cd4d3781fdcf37e371c4f9ecc79c";

export default node;
