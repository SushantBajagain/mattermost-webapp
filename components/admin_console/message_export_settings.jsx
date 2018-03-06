import React from 'react';
import {FormattedHTMLMessage, FormattedMessage} from 'react-intl';

import {JobTypes} from 'utils/constants.jsx';
import * as Utils from 'utils/utils.jsx';

import AdminSettings from './admin_settings.jsx';
import BooleanSetting from './boolean_setting.jsx';
import DropdownSetting from './dropdown_setting.jsx';
import JobsTable from './jobs';
import SettingsGroup from './settings_group.jsx';
import TextSetting from './text_setting.jsx';
import RadioSetting from './radio_setting';

const exportFormats = {
    EXPORT_FORMAT_ACTIANCE: 'actiance',
    EXPORT_FORMAT_GLOBALRELAY: 'globalrelay',
};

export default class MessageExportSettings extends AdminSettings {
    constructor(props) {
        super(props);

        this.getConfigFromState = this.getConfigFromState.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
    }

    getConfigFromState(config) {
        config.MessageExportSettings.EnableExport = this.state.enableComplianceExport;
        config.MessageExportSettings.ExportFormat = this.state.exportFormat;
        config.MessageExportSettings.DailyRunTime = this.state.exportJobStartTime;

        if (this.state.exportFormat === exportFormats.EXPORT_FORMAT_GLOBALRELAY) {
            config.MessageExportSettings.GlobalRelaySettings = {
                CustomerType: this.state.globalRelayCustomerType,
                SmtpUsername: this.state.globalRelaySmtpUsername,
                SmtpPassword: this.state.globalRelaySmtpPassword,
                EmailAddress: this.state.globalRelayEmailAddress,

            };
        }
        return config;
    }

    getStateFromConfig(config) {
        const state = {
            enableComplianceExport: config.MessageExportSettings.EnableExport,
            exportFormat: config.MessageExportSettings.ExportFormat,
            exportJobStartTime: config.MessageExportSettings.DailyRunTime,
        };
        if (config.MessageExportSettings.GlobalRelaySettings) {
            state.globalRelayCustomerType = config.MessageExportSettings.GlobalRelaySettings.CustomerType;
            state.globalRelaySmtpUsername = config.MessageExportSettings.GlobalRelaySettings.SmtpUsername;
            state.globalRelaySmtpPassword = config.MessageExportSettings.GlobalRelaySettings.SmtpPassword;
            state.globalRelayEmailAddress = config.MessageExportSettings.GlobalRelaySettings.EmailAddress;
        }
        return state;
    }

    renderTitle() {
        return (
            <FormattedMessage
                id='admin.complianceExport.title'
                defaultMessage='Compliance Export (Beta)'
            />
        );
    }

    renderSettings() {
        const exportFormatOptions = [
            {value: exportFormats.EXPORT_FORMAT_ACTIANCE, text: Utils.localizeMessage('admin.complianceExport.exportFormat.actiance', 'Actiance XML')},
            {value: exportFormats.EXPORT_FORMAT_GLOBALRELAY, text: Utils.localizeMessage('admin.complianceExport.exportFormat.globalrelay', 'GlobalRelay EML')},
        ];

        // if the export format is globalrelay, the user needs to set some additional parameters
        let globalRelaySettings;
        let dropdownHelpText;
        if (this.state.exportFormat === exportFormats.EXPORT_FORMAT_GLOBALRELAY) {
            const globalRelayCustomerType = (
                <RadioSetting
                    id='globalRelayCustomerType'
                    values={[
                        {value: 'A9', text: Utils.localizeMessage('admin.complianceExport.globalRelayCustomerType.a9.description', 'A9/Type 9')},
                        {value: 'A10', text: Utils.localizeMessage('admin.complianceExport.globalRelayCustomerType.a10.description', 'A10/Type 10')},
                    ]}
                    label={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelayCustomerType.title'
                            defaultMessage='Customer Type:'
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelayCustomerType.description'
                            defaultMessage='The type of GlobalRelay customer account that your organization has.'
                        />
                    }
                    value={this.state.globalRelayCustomerType}
                    disabled={!this.state.enableComplianceExport}
                    onChange={this.handleChange}
                />
            );

            const globalRelaySmtpUsername = (
                <TextSetting
                    id='globalRelaySmtpUsername'
                    label={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelaySmtpUsername.title'
                            defaultMessage='SMTP Username:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.complianceExport.globalRelaySmtpUsername.example', 'E.g.: "globalRelayUser"')}
                    helpText={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelaySmtpUsername.description'
                            defaultMessage='The username that is used to authenticate against the GlobalRelay SMTP server.'
                        />
                    }
                    value={this.state.globalRelaySmtpUsername === null ? '' : this.state.globalRelaySmtpUsername}
                    disabled={!this.state.enableComplianceExport}
                    onChange={this.handleChange}
                />
            );

            const globalRelaySmtpPassword = (
                <TextSetting
                    id='globalRelaySmtpPassword'
                    label={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelaySmtpPassword.title'
                            defaultMessage='SMTP Password:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.complianceExport.globalRelaySmtpPassword.example', 'E.g.: "globalRelayPassword"')}
                    helpText={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelaySmtpPassword.description'
                            defaultMessage='The password that is used to authenticate against the GlobalRelay SMTP server.'
                        />
                    }
                    value={this.state.globalRelaySmtpPassword === null ? '' : this.state.globalRelaySmtpPassword}
                    disabled={!this.state.enableComplianceExport}
                    onChange={this.handleChange}
                />
            );

            const globalRelayEmail = (
                <TextSetting
                    id='globalRelayEmailAddress'
                    label={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelayEmailAddress.title'
                            defaultMessage='Email Address:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.complianceExport.globalRelayEmailAddress.example', 'E.g.: "globalrelay@mattermost.com"')}
                    helpText={
                        <FormattedHTMLMessage
                            id='admin.complianceExport.globalRelayEmailAddress.description'
                            defaultMessage='The email address that your GlobalRelay server monitors for incoming Compliance Exports.'
                        />
                    }
                    value={this.state.globalRelayEmailAddress === null ? '' : this.state.globalRelayEmailAddress}
                    disabled={!this.state.enableComplianceExport}
                    onChange={this.handleChange}
                />
            );

            globalRelaySettings = (
                <SettingsGroup
                    id={'globalRelaySettings'}
                    header={
                        <FormattedMessage
                            id='admin.complianceExport.globalRelaySettings.title'
                            defaultMessage='GlobalRelay Settings:'
                        />
                    }
                >
                    {globalRelayCustomerType}
                    {globalRelaySmtpUsername}
                    {globalRelaySmtpPassword}
                    {globalRelayEmail}
                </SettingsGroup>
            );

            dropdownHelpText = (
                <FormattedMessage
                    id='admin.complianceExport.exportFormat.globalrelay.description'
                    defaultMessage='Format of the compliance export. Corresponds to the system that you want to import the data into. Compliance Exports will be emailed to the configured email address.'
                />
            );
        } else {
            dropdownHelpText = (
                <FormattedHTMLMessage
                    id='admin.complianceExport.exportFormat.actiance.description'
                    defaultMessage='Format of the compliance export. Corresponds to the system that you want to import the data into. Compliance Export files will be written to the "exports" subdirectory of the configured <a href="/admin_console/files/storage">Local Storage Directory</a>.'
                />
            );
        }

        return (
            <SettingsGroup>
                {/*
                <div className='banner'>
                    <div className='banner__content'>
                        <FormattedHTMLMessage
                            id='admin.complianceExport.description'
                            defaultMessage='This feature supports compliance exports to the Actiance XML and GlobalRelay EML formats, and is currently in beta. Support for the Mattermost CSV format is scheduled for a future release, and will replace the existing <a href=\"/admin_console/general/compliance\">Compliance</a> feature.'
                        />
                    </div>
                </div>
                */}

                <div className='banner'>
                    <div className='banner__content'>
                        <FormattedHTMLMessage
                            id='admin.complianceExport.description_without_globalrelay'
                            defaultMessage='This feature supports compliance exports to the Actiance XML format, and is currently in beta. Support for GlobalRelay EML and the Mattermost CSV format is scheduled for a future release, and will replace the existing <a href=\"/admin_console/general/compliance\">Compliance</a> feature.'
                        />
                    </div>
                </div>

                <BooleanSetting
                    id='enableComplianceExport'
                    label={
                        <FormattedMessage
                            id='admin.service.complianceExportTitle'
                            defaultMessage='Enable Compliance Export:'
                        />
                    }
                    helpText={
                        <FormattedHTMLMessage
                            id='admin.service.complianceExportDesc'
                            defaultMessage='When true, Mattermost will export all messages that were posted in the last 24 hours. The export task is scheduled to run once per day. See <a href=\"https://about.mattermost.com/default-compliance-export-documentation\" target=\"_blank\">the documentation</a> to learn more.'
                        />
                    }
                    value={this.state.enableComplianceExport}
                    onChange={this.handleChange}
                />

                <TextSetting
                    id='exportJobStartTime'
                    label={
                        <FormattedMessage
                            id='admin.complianceExport.exportJobStartTime.title'
                            defaultMessage='Compliance Export Time:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.complianceExport.exportJobStartTime.example', 'E.g.: "02:00"')}
                    helpText={
                        <FormattedHTMLMessage
                            id='admin.complianceExport.exportJobStartTime.description'
                            defaultMessage='Set the start time of the daily scheduled compliance export job. Choose a time when fewer people are using your system. Must be a 24-hour time stamp in the form HH:MM.'
                        />
                    }
                    value={this.state.exportJobStartTime}
                    disabled={!this.state.enableComplianceExport}
                    onChange={this.handleChange}
                />

                <DropdownSetting
                    id='exportFormat'
                    values={exportFormatOptions}
                    label={
                        <FormattedMessage
                            id='admin.complianceExport.exportFormat.title'
                            defaultMessage='Export Format:'
                        />
                    }
                    helpText={dropdownHelpText}
                    value={this.state.exportFormat}
                    disabled={!this.state.enableComplianceExport}
                    onChange={this.handleChange}
                />

                {globalRelaySettings}

                <JobsTable
                    jobType={JobTypes.MESSAGE_EXPORT}
                    disabled={!this.state.enableComplianceExport}
                    createJobButtonText={
                        <FormattedMessage
                            id='admin.complianceExport.createJob.title'
                            defaultMessage='Run Compliance Export Job Now'
                        />
                    }
                    createJobHelpText={
                        <FormattedMessage
                            id='admin.complianceExport.createJob.help'
                            defaultMessage='Initiates a Compliance Export job immediately.'
                        />
                    }
                />
            </SettingsGroup>
        );
    }
}
