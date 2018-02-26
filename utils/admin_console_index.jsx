import lunr from "lunr";
import {intlShape} from 'react-intl';

const mappingSectionsToTexts = {
    'audits': [
        'admin.audits.title',
        'admin.audits.reload',
    ],
    'authentication_email': [
        'admin.email.allowSignupTitle',
        'admin.email.allowSignupDescription',
        'admin.email.allowEmailSignInTitle',
        'admin.email.allowEmailSignInDescription',
        'admin.email.allowUsernameSignInTitle',
        'admin.email.allowUsernameSignInDescription',
    ],
    'client_versions': [
        'admin.client_versions.androidLatestVersion',
        'admin.client_versions.androidLatestVersionHelp',
        'admin.client_versions.androidMinVersion',
        'admin.client_versions.androidMinVersionHelp',
        'admin.client_versions.desktopLatestVersion',
        'admin.client_versions.desktopLatestVersionHelp',
        'admin.client_versions.desktopMinVersion',
        'admin.client_versions.desktopMinVersionHelp',
        'admin.client_versions.iosLatestVersion',
        'admin.client_versions.iosLatestVersionHelp',
        'admin.client_versions.iosMinVersion',
        'admin.client_versions.iosMinVersionHelp',
    ],
    'cluster': [
        'admin.cluster.loadedFrom',
        'admin.cluster.should_not_change',
        'admin.cluster.noteDescription',
        'admin.cluster.enableDescription',
        'admin.cluster.ClusterName',
        'admin.cluster.ClusterNameDesc',
        'admin.cluster.OverrideHostname',
        'admin.cluster.OverrideHostnameDesc',
        'admin.cluster.UseIpAddress',
        'admin.cluster.UseIpAddressDesc',
        'admin.cluster.UseExperimentalGossip',
        'admin.cluster.UseExperimentalGossipDesc',
        'admin.cluster.ReadOnlyConfig',
        'admin.cluster.ReadOnlyConfigDesc',
        'admin.cluster.GossipPort',
        'admin.cluster.GossipPortDesc',
        'admin.cluster.StreamingPort',
        'admin.cluster.StreamingPortDesc',
    ],
    'compliance': [
        'admin.compliance.noLicense',
        'admin.compliance.enableTitle',
        'admin.compliance.enableDesc',
        'admin.compliance.directoryTitle',
        'admin.compliance.directoryDescription',
        'admin.compliance.enableDailyTitle',
        'admin.compliance.enableDailyDesc',
    ],
    'configuration': [
        'admin.general.configuration',
        'admin.reload.reloadDescription',
        'admin.reload.reloadDescription.featureName',
        'admin.reload.reloadDescription.recycleDatabaseConnections',
        'admin.reload.button',
        'admin.rate.noteDescription',
        'admin.service.siteURL',
        'admin.service.siteURLDescription',
        'admin.service.listenAddress',
        'admin.service.listenDescription',
        'admin.service.tlsCertFile',
        'admin.service.tlsCertFileDescription',
        'admin.service.tlsKeyFile',
        'admin.service.tlsKeyFileDescription',
        'admin.service.useLetsEncrypt',
        'admin.service.useLetsEncryptDescription',
        'admin.service.letsEncryptCertificateCacheFile',
        'admin.service.letsEncryptCertificateCacheFileDescription',
        'admin.service.forward80To443',
        'admin.service.forward80To443Description',
        'admin.service.readTimeout',
        'admin.service.readTimeoutDescription',
        'admin.service.writeTimeout',
        'admin.service.writeTimeoutDescription',
        'admin.service.enableAPIv3',
        'admin.service.enableAPIv3Description',
        'admin.purge.purgeDescription',
        'admin.purge.button',
    ],
    'connections': [
        'admin.security.connection',
        'admin.service.corsTitle',
        'admin.service.corsDescription',
        'admin.service.insecureTlsTitle',
        'admin.service.insecureTlsDesc',
    ],
    'custom_brand': [
        'admin.customization.customBrand',
        'admin.team.brandDescriptionTitle',
        'admin.team.brandDescriptionHelp',
        'admin.team.brandTitle',
        'admin.team.brandDesc',
        'admin.team.brandTextTitle',
        'admin.team.brandTextDescription',
        'admin.team.siteNameTitle',
        'admin.team.siteNameDescription',
    ],
    'database': [
        'admin.database.title',
        'admin.recycle.recycleDescription',
        'admin.recycle.recycleDescription.featureName',
        'admin.recycle.recycleDescription.reloadConfiguration',
        'admin.recycle.button',
        'admin.sql.noteDescription',
        'admin.sql.driverName',
        'admin.sql.dataSource',
        'admin.sql.maxConnectionsTitle',
        'admin.sql.maxConnectionsDescription',
        'admin.sql.maxOpenTitle',
        'admin.sql.maxOpenDescription',
        'admin.sql.queryTimeoutTitle',
        'admin.sql.queryTimeoutDescription',
        'admin.sql.keyTitle',
        'admin.sql.keyDescription',
        'admin.sql.traceTitle',
        'admin.sql.traceDescription',
    ],
    'data_retention': [
        'admin.data_retention.title',
        'admin.data_retention.messageRetentionDays.description',
        'admin.data_retention.fileRetentionDays.description',
        'admin.data_retention.note.description',
        'admin.data_retention.note.description.documentationLinkText',
        'admin.data_retention.enableMessageDeletion.title',
        'admin.data_retention.enableMessageDeletion.description',
        'admin.data_retention.enableFileDeletion.title',
        'admin.data_retention.enableFileDeletion.description',
        'admin.data_retention.deletionJobStartTime.title',
        'admin.data_retention.deletionJobStartTime.description',
        'admin.data_retention.createJob.title',
        'admin.data_retention.createJob.help',
    ],
    'developer': [
        'admin.developer.title',
        'admin.service.testingTitle',
        'admin.service.testingDescription',
        'admin.service.developerTitle',
        'admin.service.developerDesc',
        'admin.service.internalConnectionsTitle',
        'admin.service.internalConnectionsDesc',
    ],
    'elasticsearch': [
        'admin.elasticsearch.percentComplete',
        'admin.elasticsearch.title',
        'admin.elasticsearch.noteDescription',
        'admin.elasticsearch.enableIndexingTitle',
        'admin.elasticsearch.enableIndexingDescription',
        'admin.elasticsearch.enableIndexingDescription.documentationLinkText',
        'admin.elasticsearch.connectionUrlTitle',
        'admin.elasticsearch.connectionUrlDescription',
        'admin.elasticsearch.connectionUrlExample.documentationLinkText',
        'admin.elasticsearch.usernameTitle',
        'admin.elasticsearch.usernameDescription',
        'admin.elasticsearch.passwordTitle',
        'admin.elasticsearch.passwordDescription',
        'admin.elasticsearch.sniffTitle',
        'admin.elasticsearch.sniffDescription',
        'admin.elasticsearch.testHelpText',
        'admin.elasticsearch.elasticsearch_test_button',
        'admin.elasticsearch.bulkIndexingTitle',
        'admin.elasticsearch.createJob.title',
        'admin.elasticsearch.createJob.help',
        'admin.elasticsearch.purgeIndexesHelpText',
        'admin.elasticsearch.purgeIndexesButton',
        'admin.elasticsearch.purgeIndexesButton.label',
        'admin.elasticsearch.enableSearchingTitle',
        'admin.elasticsearch.enableSearchingDescription',
    ],
    'emoji': [
    ],
    'gitlab': [
        'admin.authentication.gitlab',
        'admin.gitlab.enableTitle',
        'admin.gitlab.enableDescription',
        'admin.gitlab.EnableHtmlDesc',
        'admin.gitlab.clientIdTitle',
        'admin.gitlab.clientIdDescription',
        'admin.gitlab.clientSecretTitle',
        'admin.gitlab.clientSecretDescription',
        'admin.gitlab.siteUrl',
        'admin.gitlab.siteUrlDescription',
        'admin.gitlab.userTitle',
        'admin.gitlab.authTitle',
        'admin.gitlab.tokenTitle',
    ],
    'integrations.custom': [
    ],
    'integrations.external': [
    ],
    'ldap': [
        'admin.authentication.ldap',
        'admin.ldap.jobExtraInfo',
        'admin.ldap.enableTitle',
        'admin.ldap.enableDesc',
        'admin.ldap.enableSyncTitle',
        'admin.ldap.enableSyncDesc',
        'admin.ldap.serverTitle',
        'admin.ldap.serverDesc',
        'admin.ldap.portTitle',
        'admin.ldap.portDesc',
        'admin.ldap.skipCertificateVerification',
        'admin.ldap.skipCertificateVerificationDesc',
        'admin.ldap.baseTitle',
        'admin.ldap.baseDesc',
        'admin.ldap.bindUserTitle',
        'admin.ldap.bindUserDesc',
        'admin.ldap.bindPwdTitle',
        'admin.ldap.bindPwdDesc',
        'admin.ldap.userFilterTitle',
        'admin.ldap.userFilterDisc',
        'admin.ldap.firstnameAttrTitle',
        'admin.ldap.firstnameAttrDesc',
        'admin.ldap.lastnameAttrTitle',
        'admin.ldap.lastnameAttrDesc',
        'admin.ldap.nicknameAttrTitle',
        'admin.ldap.nicknameAttrDesc',
        'admin.ldap.positionAttrTitle',
        'admin.ldap.positionAttrDesc',
        'admin.ldap.emailAttrTitle',
        'admin.ldap.emailAttrDesc',
        'admin.ldap.usernameAttrTitle',
        'admin.ldap.uernameAttrDesc',
        'admin.ldap.idAttrTitle',
        'admin.ldap.idAttrDesc',
        'admin.ldap.loginNameTitle',
        'admin.ldap.loginNameDesc',
        'admin.ldap.syncIntervalTitle',
        'admin.ldap.syncIntervalHelpText',
        'admin.ldap.maxPageSizeTitle',
        'admin.ldap.maxPageSizeHelpText',
        'admin.ldap.queryTitle',
        'admin.ldap.queryDesc',
        'admin.ldap.testHelpText',
        'admin.ldap.ldap_test_button',
        'admin.ldap.sync_button',
        'admin.ldap.syncNowHelpText',
    ],
    'legal_and_support': [
        'admin.customization.support',
        'admin.support.termsTitle',
        'admin.support.termsDesc',
        'admin.support.privacyTitle',
        'admin.support.privacyDesc',
        'admin.support.aboutTitle',
        'admin.support.aboutDesc',
        'admin.support.helpTitle',
        'admin.support.helpDesc',
        'admin.support.problemTitle',
        'admin.support.problemDesc',
        'admin.support.emailTitle',
        'admin.support.emailHelp',
    ],
    'license': [
        'admin.license.keyRemove',
        'admin.license.noFile',
        'admin.license.choose',
        'admin.license.upload',
        'admin.license.uploadDesc',
        'admin.license.title',
        'admin.license.edition',
        'admin.license.type',
        'admin.license.key',
    ],
    'link_previews': [
    ],
    'localization': [
    ],
    'logging': [
    ],
    'logs': [
    ],
    'message_export': [
    ],
    'metrics': [
        'admin.advance.metrics',
        'admin.metrics.enableTitle',
        'admin.metrics.enableDescription',
        'admin.metrics.listenAddressTitle',
        'admin.metrics.listenAddressDesc',
    ],
    'mfa': [
        'admin.mfa.title',
        'admin.mfa.bannerDesc',
        'admin.service.mfaTitle',
        'admin.service.mfaDesc',
        'admin.service.enforceMfaTitle',
        'admin.service.enforceMfaDesc',
    ],
    'native_app_links': [
    ],
    'notifications_email': [
    ],
    'oauth': [
        'admin.authentication.oauth',
        'admin.google.clientIdTitle',
        'admin.google.clientIdDescription',
        'admin.google.clientSecretTitle',
        'admin.google.clientSecretDescription',
        'admin.google.userTitle',
        'admin.google.authTitle',
        'admin.google.tokenTitle',
        'admin.office365.clientIdTitle',
        'admin.office365.clientIdDescription',
        'admin.office365.clientSecretTitle',
        'admin.office365.clientSecretDescription',
        'admin.office365.userTitle',
        'admin.office365.authTitle',
        'admin.office365.tokenTitle',
        'admin.gitlab.clientIdTitle',
        'admin.gitlab.clientIdDescription',
        'admin.gitlab.clientSecretTitle',
        'admin.gitlab.clientSecretDescription',
        'admin.gitlab.siteUrl',
        'admin.gitlab.siteUrlDescription',
        'admin.gitlab.userTitle',
        'admin.gitlab.authTitle',
        'admin.gitlab.tokenTitle',
        'admin.gitlab.EnableHtmlDesc',
        'admin.google.EnableHtmlDesc',
        'admin.office365.EnableHtmlDesc',
        'admin.oauth.select',
    ],
    'password': [
    ],
    'plugins.configuration': [
    ],
    'plugins.management': [
    ],
    'policy': [
        'admin.general.policy',
        'admin.general.policy.teamInviteTitle',
        'admin.general.policy.teamInviteDescription',
        'admin.general.policy.restrictPublicChannelCreationTitle',
        'admin.general.policy.restrictPublicChannelCreationDescription',
        'admin.general.policy.restrictPublicChannelManagementTitle',
        'admin.general.policy.restrictPublicChannelManagementDescription',
        'admin.general.policy.restrictPublicChannelDeletionTitle',
        'admin.general.policy.restrictPublicChannelDeletionDescription',
        'admin.general.policy.restrictPublicChannelDeletionCommandLineToolLink',
        'admin.general.policy.restrictPrivateChannelCreationTitle',
        'admin.general.policy.restrictPrivateChannelCreationDescription',
        'admin.general.policy.restrictPrivateChannelManagementTitle',
        'admin.general.policy.restrictPrivateChannelManagementDescription',
        'admin.general.policy.restrictPrivateChannelManageMembersTitle',
        'admin.general.policy.restrictPrivateChannelManageMembersDescription',
        'admin.general.policy.restrictPrivateChannelDeletionTitle',
        'admin.general.policy.restrictPrivateChannelDeletionDescription',
        'admin.general.policy.restrictPrivateChannelDeletionCommandLineToolLink',
        'admin.general.policy.restrictPostDeleteTitle',
        'admin.general.policy.restrictPostDeleteDescription',
        'admin.general.policy.allowEditPostTitle',
        'admin.general.policy.allowEditPostDescription',
        'admin.general.policy.enableBannerTitle',
        'admin.general.policy.enableBannerDesc',
        'admin.general.policy.bannerTextTitle',
        'admin.general.policy.bannerTextDesc',
        'admin.general.policy.bannerColorTitle',
        'admin.general.policy.bannerTextColorTitle',
        'admin.general.policy.allowBannerDismissalTitle',
        'admin.general.policy.allowBannerDismissalDesc',
    ],
    'privacy': [
        'admin.general.privacy',
        'admin.privacy.showEmailTitle',
        'admin.privacy.showEmailDescription',
        'admin.privacy.showFullNameTitle',
        'admin.privacy.showFullNameDescription',
    ],
    'public_links': [
        'admin.security.public_links',
        'admin.image.shareTitle',
        'admin.image.shareDescription',
        'admin.image.publicLinkTitle',
        'admin.image.publicLinkDescription',
    ],
    'push': [
        'admin.notifications.title',
        'admin.email.pushOffHelp',
        'admin.email.mhpnsHelp',
        'admin.email.mtpnsHelp',
        'admin.email.easHelp',
        'admin.email.agreeHPNS',
        'admin.notifications.push',
        'admin.email.pushTitle',
        'admin.email.pushServerTitle',
        'admin.email.pushContentTitle',
        'admin.email.pushContentDesc',
    ],
    'rate': [
        'admin.rate.title',
        'admin.rate.noteDescription',
        'admin.rate.enableLimiterTitle',
        'admin.rate.enableLimiterDescription',
        'admin.rate.queriesTitle',
        'admin.rate.queriesDescription',
        'admin.rate.maxBurst',
        'admin.rate.maxBurstDescription',
        'admin.rate.memoryTitle',
        'admin.rate.memoryDescription',
        'admin.rate.remoteTitle',
        'admin.rate.remoteDescription',
        'admin.rate.varyByUser',
        'admin.rate.varyByUserDescription',
        'admin.rate.httpHeaderTitle',
        'admin.rate.httpHeaderDescription',
    ],
    'saml': [
        'admin.authentication.saml',
        'admin.saml.idpCertificateFileTitle',
        'admin.saml.idpCertificateFileRemoveDesc',
        'admin.saml.idpCertificateFileTitle',
        'admin.saml.idpCertificateFileDesc',
        'admin.saml.privateKeyFileTitle',
        'admin.saml.privateKeyFileFileRemoveDesc',
        'admin.saml.privateKeyFileTitle',
        'admin.saml.privateKeyFileFileDesc',
        'admin.saml.publicCertificateFileTitle',
        'admin.saml.publicCertificateFileRemoveDesc',
        'admin.saml.publicCertificateFileTitle',
        'admin.saml.publicCertificateFileDesc',
        'admin.saml.assertionConsumerServiceURLPopulatedDesc',
        'admin.saml.assertionConsumerServiceURLDesc',
        'admin.saml.enableTitle',
        'admin.saml.enableDescription',
        'admin.saml.enableSyncWithLdapTitle',
        'admin.saml.enableSyncWithLdapDescription',
        'admin.saml.idpUrlTitle',
        'admin.saml.idpUrlDesc',
        'admin.saml.idpDescriptorUrlTitle',
        'admin.saml.idpDescriptorUrlDesc',
        'admin.saml.verifyTitle',
        'admin.saml.verifyDescription',
        'admin.saml.assertionConsumerServiceURLTitle',
        'admin.saml.encryptTitle',
        'admin.saml.encryptDescription',
        'admin.saml.emailAttrTitle',
        'admin.saml.emailAttrDesc',
        'admin.saml.usernameAttrTitle',
        'admin.saml.usernameAttrDesc',
        'admin.saml.firstnameAttrTitle',
        'admin.saml.firstnameAttrDesc',
        'admin.saml.lastnameAttrTitle',
        'admin.saml.lastnameAttrDesc',
        'admin.saml.nicknameAttrTitle',
        'admin.saml.nicknameAttrDesc',
        'admin.saml.positionAttrTitle',
        'admin.saml.positionAttrDesc',
        'admin.saml.localeAttrTitle',
        'admin.saml.localeAttrDesc',
        'admin.saml.loginButtonTextTitle',
        'admin.saml.loginButtonTextDesc',
    ],
    'sessions': [
    ],
    'sign_up': [
    ],
    'storage': [
    ],
    'system_analytics': [
    ],
    'team_analytics': [
    ],
    'users': [
    ],
    'users_and_teams': [
    ],
    'webrtc': [
    ],
}

export function generateIndex(intl) {
    var idx = lunr(function () {
        this.ref('ref')
        this.field('text')
        for (let key of Object.keys(mappingSectionsToTexts)) {
            let text = "";
            for (let str of mappingSectionsToTexts[key]) {
                text += " "+intl.formatMessage({id: str})
            }
            this.add({ref: key, text})
        }
    })
    return idx;
}
