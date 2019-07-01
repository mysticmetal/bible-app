import './ba-notification.js';
import { baseStyles } from '../../styles/base.js';
import { clearNotification } from '../../actions/notification.js';
import { css, html, LitElement } from 'lit-element';
import { notificationStyles } from '../../styles/notifications.js';
import store from '../../store.js';

class BibleAppSWUpdate extends LitElement {
  static get is() { return 'ba-sw-update'; }

  static get styles() {
    return [
      baseStyles,
      notificationStyles,

      css`
        button {
          background-color: var(--notification__bg-color);
          border-radius: .5rem;
          border-style: none;
          color: var(--font-color);
          cursor: pointer;
          font-family: inherit;
          font-size: 1rem;
          line-height: 1.5rem;
          margin-left: 3rem;
          padding: 8px 12px;
          transition: background-color 0.1s ease-in-out;
        }

        button:focus,
        button:hover {
          background-color: #78909c;
        }
      `,
    ];
  }

  render() {
    return html`
      <ba-notification @click=${this._handleNotificationClick}>
        <div class="notification">
          <span>Update Available.</span>
          <button @click=${this._handleRefreshClick}>Refresh?</button>
        </div>
      </ba-notification>
    `;
  }

  firstUpdated() {
    setTimeout(() => this.renderRoot.querySelector('div').classList.add('notification--enter'), 0);
  }

  _handleNotificationClick() {
    store.dispatch(clearNotification());
  }

  _handleRefreshClick() {
    window.location.reload();
  }
}

customElements.define(BibleAppSWUpdate.is, BibleAppSWUpdate);

export default BibleAppSWUpdate;