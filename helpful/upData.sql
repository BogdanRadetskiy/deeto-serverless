INSERT INTO public."Avatars"
("avatarId", "type", url, "createdAt", "updatedAt")
VALUES('00000000-0000-0000-0000-000000020002', 'picture'::"enum_Avatars_type", 'http://google.com/user1.png', now(), now());


insert into public."AuthenticatedUsers"
("authenticatedUserId",username, "firstName", "lastName", email, "cognitoUserId", "userStatus","createdAt", "updatedAt", "avatarId")
values ('832aee14-bcbe-43f7-a0cc-000000000000',
        'deetodefault','Deeto', 'Default', 'default@deeto.ai', '832aee14-bcbe-43f7-a0cc-dee8fd8ea089', 'pending', NOW(), NOW(),'00000000-0000-0000-0000-000000020002');

INSERT INTO public."Avatars"
("avatarId", "type", url, "createdAt", "updatedAt")
VALUES('00000000-0000-0000-0000-000000020001', 'picture'::"enum_Avatars_type", 'http://google.com/disney.png', now(), now());


INSERT INTO public."Vendors"
("vendorId", "name", "accountLevel", "activationDate", "avatarId", "createdAt", "updatedAt")
VALUES('00000000-0000-0000-0000-000000010001', 'Test Account', 'trial'::"enum_Vendors_accountLevel", now(), '00000000-0000-0000-0000-000000020001', now(), now());

INSERT INTO public."VendorContacts"
("vendorContactId", "sendEmailOnBehalf", "authenticatedUserId", "vendorId", "createdAt", "updatedAt")
VALUES('00000000-0000-0000-0000-000000030001', '0', '832aee14-bcbe-43f7-a0cc-000000000000', '00000000-0000-0000-0000-000000010001', now(), now());

INSERT INTO public."Accounts"
("accountId", "companyName", "companySize", "createdAt", "updatedAt", "vendorId")
VALUES('00000000-0000-0000-0000-000000040001', 'Default Prospect', '100-200', now(), now(), '00000000-0000-0000-0000-000000010001');


INSERT INTO public."Avatars"
("avatarId", "type", url, "createdAt", "updatedAt")
VALUES('00000000-0000-0000-0000-000000020003', 'picture'::"enum_Avatars_type", 'http://google.com/user2.png', now(), now());


insert into public."AuthenticatedUsers"
("authenticatedUserId",username, "firstName", "lastName", email, "cognitoUserId", "userStatus","createdAt", "updatedAt", "avatarId")
values ('00000000-0000-0000-0000-000000060001',
        'deetodefaultprospect','prospect', 'Default', 'prospect@deeto.ai', '00000000-0000-0000-0000-000000070001', 'pending', NOW(), NOW(),'00000000-0000-0000-0000-000000020003');


INSERT INTO public."AccountContacts"
("accountContactId", title, "publicNote", "selectedReviewQuote", often, "authenticatedUserId", "accountId", "createdAt", "updatedAt", "adminId")
VALUES('00000000-0000-0000-0000-000000050001', 'CEO of Prospect', 'We love to see him', 'we selected him as a prospect', '6 times', '00000000-0000-0000-0000-000000060001', '00000000-0000-0000-0000-000000040001', now(), now(), '00000000-0000-0000-0000-000000030001');


INSERT INTO public."Accounts"
("accountId", "companyName", "companySize", "createdAt", "updatedAt", "vendorId")
VALUES('00000000-0000-0000-0000-000000040002', 'Default Reference', '100-200', now(), now(), '00000000-0000-0000-0000-000000010001');


INSERT INTO public."Avatars"
("avatarId", "type", url, "createdAt", "updatedAt")
VALUES('00000000-0000-0000-0000-000000020004', 'picture'::"enum_Avatars_type", 'http://google.com/user3.png', now(), now());

insert into public."AuthenticatedUsers"
("authenticatedUserId",username, "firstName", "lastName", email, "cognitoUserId", "userStatus","createdAt", "updatedAt", "avatarId")
values ('00000000-0000-0000-0000-000000060002',
        'deetodefaultreference','Reference', 'Default', 'reference@deeto.ai', '00000000-0000-0000-0000-000000070001', 'pending', NOW(), NOW(),'00000000-0000-0000-0000-000000020004');

INSERT INTO public."AccountContacts"
("accountContactId", title, "publicNote", "selectedReviewQuote", often, "authenticatedUserId", "accountId", "createdAt", "updatedAt", "adminId")
VALUES('00000000-0000-0000-0000-000000050002', 'CEO of Reference', 'We love to see him', 'we selected him as a reference', '6 times', '00000000-0000-0000-0000-000000060002', '00000000-0000-0000-0000-000000040002', now(), now(), '00000000-0000-0000-0000-000000030001');

INSERT INTO public."Opportunities"
("opportunityId", description, "dollarValue", budget, "accountContactId", "createdAt", "updatedAt", "accountId", "ownerId")
VALUES('00000000-0000-0000-0000-000000080001', 'Demo Opportunity', 1000, 1000, '00000000-0000-0000-0000-000000050001', now(), now(), '00000000-0000-0000-0000-000000040001', '00000000-0000-0000-0000-000000030001');


INSERT INTO public."Meetings"
("meetingId", "opportunityId", "referenceContactId", "prospectContactId", "initiatorId", "referenceAccountId", "createdAt", "updatedAt")
VALUES('00000000-0000-0000-0000-000000090001', '00000000-0000-0000-0000-000000080001', '00000000-0000-0000-0000-000000050002', '00000000-0000-0000-0000-000000050002', '00000000-0000-0000-0000-000000030001', '00000000-0000-0000-0000-000000040002', now(), now());
