import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Home, Logout, ViewList, Terrain } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/actions/userActions';

const Wrapper = styled.div`
	display: flex;
	height: 100vh;

	.side-bar {
		background-color: ${props => props.theme.color.green};
		border-radius: 0px 10px 10px 0px;
		padding: 5rem 1rem 0rem 1rem;
		min-width: 240px;
		gap: 1rem;
	}
	.side-bar > * {
		margin-bottom: 0.5rem;
	}

	.link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: ${props => props.theme.color.light};
		color: ${props => props.theme.color.white};
		border-radius: 0.5rem;
		text-decoration: none;
		padding: 10px 20px;
	}
	
	.isActive {
		background: ${props => props.theme.color.white};
		color: ${props => props.theme.color.green};
	}
	
	@media only screen and (max-width: 800px) {
		display: block;
		.side-bar {
			align-items: center;
			min-height: 3rem;
			border-radius: 0;
			padding: 0.5rem;
			display: flex;
			gap: 0.5rem;
		}
		.side-bar > * {
		margin-bottom: 0rem;
	}
}
`;

const DashboardLayout = ({ children, type }) => {
	const dispatch = useDispatch();
	const logoutClick = () => dispatch(logoutUser());

	const links = {
		admin: [
			{ name: 'Overview', path: '/dashboard', icon: Home },
			{ name: 'Devices', path: '/devices', icon: ViewList },
			{ name: 'Logout', path: '/', icon: Logout, onClick: logoutClick  }
		],
		user: [
			{ name: 'Overview', path: '/dashboard', icon: Home },
			{ name: 'My Devices', path: '/devices', icon: ViewList },
			{ name: 'Plots', path: '/plots', icon: Terrain },
			{ name: 'Logout', path: '/', icon: Logout, onClick: logoutClick  }
		]
	};

	const displayLink = links[type].map(data => {
		const { icon, name, path, onClick } = data;
		const Icon = icon;
		return (
			<NavLink
				onClick={onClick}
				className={d => `link ${d.isActive && 'isActive'}`}
				to={path}
				key={path}
			>
				<Icon />
				{name}
			</NavLink>
		);
	});

	return (
		<Wrapper>
			<div className="side-bar">{displayLink}</div>
			<div>{children}</div>
		</Wrapper>
	);
};

DashboardLayout.defaultProps = {
	type: 'user'
};

DashboardLayout.propTypes = {
	children: PropTypes.any.isRequired,
	type: PropTypes.string.isRequired
};

export default DashboardLayout;