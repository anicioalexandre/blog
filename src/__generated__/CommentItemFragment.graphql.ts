/**
 * @generated SignedSource<<1cecbdf928b592725514d4d1315bcfb2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentItemFragment$data = {
  readonly author: {
    readonly avatarUrl: any;
    readonly login: string;
  } | null | undefined;
  readonly body: string;
  readonly createdAt: any;
  readonly id: string;
  readonly " $fragmentType": "CommentItemFragment";
};
export type CommentItemFragment$key = {
  readonly " $data"?: CommentItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommentItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommentItemFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "login",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "DiscussionComment",
  "abstractKey": null
};

(node as any).hash = "3089809c966a60be9d29d47a392dc0ed";

export default node;
