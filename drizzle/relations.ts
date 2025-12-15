import { relations } from "drizzle-orm/relations";
import { user, account, session, nodes, edges, histoires } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const edgesRelations = relations(edges, ({one}) => ({
	node_target: one(nodes, {
		fields: [edges.target],
		references: [nodes.id],
		relationName: "edges_target_nodes_id"
	}),
	node_source: one(nodes, {
		fields: [edges.source],
		references: [nodes.id],
		relationName: "edges_source_nodes_id"
	}),
	histoire: one(histoires, {
		fields: [edges.histoireId],
		references: [histoires.id]
	}),
}));

export const nodesRelations = relations(nodes, ({one, many}) => ({
	edges_target: many(edges, {
		relationName: "edges_target_nodes_id"
	}),
	edges_source: many(edges, {
		relationName: "edges_source_nodes_id"
	}),
	histoire: one(histoires, {
		fields: [nodes.histoireId],
		references: [histoires.id]
	}),
}));

export const histoiresRelations = relations(histoires, ({many}) => ({
	edges: many(edges),
	nodes: many(nodes),
}));